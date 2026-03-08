/**
 * Pay with M-Pesa - UI flow only. Investor enters amount and receiver phone, then confirms.
 * Receiver phone must be valid Safaricom Ethiopia format (07XXXXXXXX).
 * No payment integration; strict confirmation before "pay".
 */

// Safaricom Ethiopia: 07 + 8 digits, or +2517 + 8 digits (normalized: no spaces)
function normalizePhone(value) {
  return (value || '').replace(/\s/g, '').trim()
}
function isValidSafaricomPhone(value) {
  const n = normalizePhone(value)
  return /^(07|\+?2517)[0-9]{8}$/.test(n)
}

function getPhoneErrorMessage(value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return ''
  const n = normalizePhone(trimmed)
  if (n.length < 10) return 'Enter a full Safaricom number (07XXXXXXXX).'
  if (!/^[0-9+]/.test(trimmed)) return 'Phone number should start with 07 or +2517.'
  if (!/^(07|\+?2517)[0-9]{8}$/.test(n)) return 'Use valid Safaricom Ethiopia format: 07XXXXXXXX or +2517XXXXXXXX.'
  return ''
}

import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getBusinessesForInvestment } from '../../lib/applicationsData'
import { recordInvestment } from '../../lib/investorStorage'
import Modal from '../../components/ui/Modal'

function PayWithMpesaPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [receiverPhone, setReceiverPhone] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [paySuccess, setPaySuccess] = useState(false)

  const businesses = useMemo(() => getBusinessesForInvestment(), [])
  const business = businesses.find((b) => b.id === id)
  const businessName = business ? business.name : 'Business'

  const phoneError = getPhoneErrorMessage(receiverPhone)
  const phoneValid = receiverPhone.trim() === '' ? false : !phoneError
  const canPay = amount.trim() !== '' && phoneValid
  const amountDisplay = amount.trim() ? `ETB ${Number(amount).toLocaleString()}` : '—'
  const phoneDisplay = receiverPhone.trim() || '—'

  const handleOpenConfirm = (e) => {
    e.preventDefault()
    setPhoneTouched(true)
    if (!canPay) return
    if (!isValidSafaricomPhone(receiverPhone)) return
    setShowConfirm(true)
  }

  const handleCancelConfirm = () => {
    setShowConfirm(false)
  }

  const handleConfirmPay = () => {
    setShowConfirm(false)
    try {
      recordInvestment(id, { amount })
      setPaySuccess(true)
    } catch (err) {
      // still show success for UI flow
      setPaySuccess(true)
    }
  }

  const handleBackToBusiness = () => {
    navigate(`/investor/businesses/${id}`)
  }

  const handleBackToInvestments = () => {
    navigate('/investor/investments')
  }

  if (paySuccess) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl border border-brand-dark/30 shadow-card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-3xl">
            ✓
          </div>
          <h1 className="text-xl font-bold text-text mb-2">Payment initiated</h1>
          <p className="text-text-muted text-sm mb-6">
            You will receive an M-Pesa prompt on your phone to complete the payment. Once you approve, the amount will be sent to the receiver.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleBackToBusiness}
              className="px-4 py-2.5 rounded-xl font-medium border border-slate-200 text-text hover:bg-slate-50"
            >
              Back to business
            </button>
            <button
              type="button"
              onClick={handleBackToInvestments}
              className="px-4 py-2.5 rounded-xl font-medium bg-primary text-white hover:bg-primary-hover"
            >
              My Investments
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm text-primary font-medium hover:underline mb-6"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl border border-brand-dark/30 shadow-card overflow-hidden">
        <div className="bg-primary px-6 py-4 text-white">
          <h1 className="text-lg font-semibold">Pay with M-Pesa</h1>
          <p className="text-white/90 text-sm mt-0.5">Investing in {businessName}</p>
        </div>

        <form onSubmit={handleOpenConfirm} className="p-6 space-y-5">
          <div>
            <label htmlFor="mpesa-amount" className="block text-sm font-medium text-text mb-1.5">
              Amount to fund (ETB)
            </label>
            <input
              id="mpesa-amount"
              type="number"
              min="1"
              placeholder="e.g. 5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="mpesa-phone" className="block text-sm font-medium text-text mb-1.5">
              Receiver&apos;s phone number (Safaricom Ethiopia)
            </label>
            <input
              id="mpesa-phone"
              type="tel"
              inputMode="numeric"
              placeholder="07XXXXXXXX (e.g. 0712345678)"
              value={receiverPhone}
              onChange={(e) => setReceiverPhone(e.target.value)}
              onBlur={() => setPhoneTouched(true)}
              className={`w-full px-4 py-2.5 rounded-lg border bg-white text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                phoneTouched && phoneError ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-primary'
              }`}
            />
            {phoneTouched && phoneError && (
              <p className="mt-1.5 text-sm text-red-600" role="alert">{phoneError}</p>
            )}
            <p className="mt-1 text-xs text-text-muted">Valid Safaricom Ethiopia format: 07 followed by 8 digits (e.g. 0712345678), or +2517XXXXXXXX.</p>
          </div>

          <button
            type="submit"
            disabled={!canPay}
            className="w-full py-3 rounded-xl font-semibold bg-primary text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Pay
          </button>
        </form>
      </div>

      <Modal
        show={showConfirm}
        onHide={handleCancelConfirm}
        title="Confirm payment"
        size="sm"
        footer={
          <>
            <button
              type="button"
              onClick={handleCancelConfirm}
              className="px-4 py-2 rounded-btn text-sm font-medium bg-slate-100 text-text hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmPay}
              className="px-4 py-2 rounded-btn text-sm font-medium bg-primary text-white hover:bg-primary-hover"
            >
              Yes, I&apos;m sure — Pay
            </button>
          </>
        }
      >
        <p className="text-text mb-3">Are you sure you want to pay?</p>
        <div className="bg-slate-50 rounded-lg p-4 text-sm">
          <p className="text-text-muted"><strong className="text-text">Amount:</strong> {amountDisplay}</p>
          <p className="text-text-muted mt-1"><strong className="text-text">Receiver phone:</strong> {phoneDisplay}</p>
        </div>
        <p className="text-amber-700 text-sm mt-3 font-medium">This action will initiate the payment. Please confirm only if the details are correct.</p>
      </Modal>
    </div>
  )
}

export default PayWithMpesaPage
