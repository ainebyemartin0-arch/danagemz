# Deploying DanaGemz to Render

## 1. Prepare the repository

- Ensure `requirements.txt` is up to date.
- Ensure `render.yaml` exists at the repository root.
- Ensure `.gitignore` excludes `db.sqlite3`, `media/`, `staticfiles/`, and `.env`.

## 2. Update `render.yaml` if needed

- `buildCommand`: `pip install -r requirements.txt`
- `startCommand`: `gunicorn danagemz_project.wsgi:application`
- `plan`: `free`
- `staticPublishPath`: `staticfiles`

## 3. Render environment variables

Set these in Render dashboard or `render.yaml`:
- `DJANGO_SETTINGS_MODULE=danagemz_project.settings`
- `DEBUG=False`
- `ALLOWED_HOSTS=0.0.0.0,127.0.0.1,your-app.onrender.com`
- `SECRET_KEY` with a secure random value
- `DATABASE_URL` from Render Postgres if using Postgres
- `CLOUDINARY_URL` if you want image uploads stored in Cloudinary
- `DJANGO_SUPERUSER_USERNAME`
- `DJANGO_SUPERUSER_EMAIL`
- `DJANGO_SUPERUSER_PASSWORD`

## 4. Recommended Render setup

1. Create a new web service from GitHub repository.
2. Use the `python` environment and `free` plan.
3. Render reads `render.yaml` automatically.
4. Set the required environment variables.
5. Deploy.

## 5. Notes

- Static files are collected into `staticfiles` using WhiteNoise.
- Media uploads use local storage when `CLOUDINARY_URL` is empty or undefined.
- For production image uploads on Render, use Cloudinary and set `CLOUDINARY_URL`.
- If you want database persistence, use Render Postgres and set `DATABASE_URL`.

## 6. Troubleshooting

- If `DEBUG=False` and no `ALLOWED_HOSTS` includes your Render domain, Django will reject requests.
- If `DATABASE_URL` is not set, Django falls back to `sqlite:///db.sqlite3`.
- If image uploads fail, verify `CLOUDINARY_URL` or local storage permissions.
