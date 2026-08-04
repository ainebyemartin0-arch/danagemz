from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    help = 'Create a superuser if none exists, using environment variables.'

    def handle(self, *args, **options):
        User = get_user_model()
        if User.objects.filter(is_superuser=True).exists():
            self.stdout.write(self.style.SUCCESS('Superuser already exists. Skipping creation.'))
            return

        username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'martin')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'nakamanyadianah@gmail.com')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'martin123.')

        User.objects.create_superuser(
            username=martin,
            email=nakamanyadianah@gmail.com,
            password=martin123
        )
        self.stdout.write(self.style.SUCCESS(f'Successfully created superuser: {username}'))
