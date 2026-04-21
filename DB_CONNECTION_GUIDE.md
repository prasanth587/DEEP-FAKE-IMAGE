# Database Connection Guide (DBeaver)

Follow these steps to connect to your Railway PostgreSQL database using DBeaver.

## Connection Details

| Parameter | Value |
| :--- | :--- |
| **Host** | `shinkansen.proxy.rlwy.net` |
| **Port** | `10710` |
| **Database** | `railway` |
| **User** | `postgres` |
| **Password** | `YOUR_DATABASE_PASSWORD_HERE` |

## Steps to Connect

1. **Open DBeaver** and click on **New Database Connection** (the plug icon in the top left).
2. Select **PostgreSQL** from the list of database types.
3. In the **Main** tab, enter the following:
   - **Host**: `shinkansen.proxy.rlwy.net`
   - **Port**: `10710`
   - **Database**: `railway`
   - **User**: `postgres`
   - **Password**: `YOUR_DATABASE_PASSWORD_HERE`
4. Click **Test Connection**.
   - *Note: You may be prompted to download the PostgreSQL driver. Click **Download** if necessary.*
5. Once the test is successful, click **Finish**.

## Public URL
If you need the full connection string:
`postgresql://postgres:YOUR_DATABASE_PASSWORD_HERE@shinkansen.proxy.rlwy.net:10710/railway`

