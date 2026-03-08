# Expert dashboard – access and “API”

## How to get in

1. **Login page (URL)**  
   Open in your app:
   ```
   /expert/login
   ```
   Full URL example: `http://localhost:5173/expert/login` (or your site’s origin + `/expert/login`).

2. **Credentials**
   - **Email:** `expert@melika.com`
   - **Password:** Any of these (or any non-empty password for that email):
     - `Expert123!`
     - `expert123!`
     - `Expert123`
     - `expert123`
     - Or type anything (e.g. `1` or `password`) – the default expert account accepts any non-empty password.

3. After login you are redirected to the **expert dashboard** at `/expert`.

---

## Expert dashboard routes (“API” / URLs)

| Purpose              | Route (path)       | Full URL example                    |
|----------------------|--------------------|-------------------------------------|
| Expert login         | `/expert/login`    | `http://localhost:5173/expert/login` |
| Expert dashboard     | `/expert`          | `http://localhost:5173/expert`       |
| Expert applications  | `/expert/applications` | `http://localhost:5173/expert/applications` |

There is no separate HTTP API server: the app uses the same data in the browser (localStorage + `src/lib/applicationsData.js`, `src/lib/expertStorage.js`). The “API” for the expert dashboard is these routes and the in-app data layer.

---

## What the expert dashboard does

- **Dashboard (`/expert`):** Counts of pending, approved for investment, approved for grant.
- **Applications (`/expert/applications`):** List of all user applications. For **pending** rows you can choose **Grant**, **Investment**, or **Reject**. Those updates are stored and drive what investors and users see (same data source).
