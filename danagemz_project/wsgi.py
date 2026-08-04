import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'danagemz_project.settings')

application = get_wsgi_application()

# Serve static files with WhiteNoise in production
from whitenoise import WhiteNoise
application = WhiteNoise(application, root='/opt/render/project/src/staticfiles')
