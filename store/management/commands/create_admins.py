from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    help = 'Create default superusers (martin and dana) if they do not exist.'

    def handle(self, *args, **options):
        User = get_user_model()
        
        # Define the two admins
        admins = [
            {
                'username': os.environ.get('ADMIN_MARTIN_USERNAME', 'martin'),
                'email': os.environ.get('ADMIN_MARTIN_EMAIL', 'martin@example.com'),
                'password': os.environ.get('ADMIN_MARTIN_PASSWORD', 'martin12345')
            },
            {
                'username': os.environ.get('ADMIN_DANA_USERNAME', 'dana'),
                'email': os.environ.get('ADMIN_DANA_EMAIL', 'nakamanyadianah@gmail.com'),
                'password': os.environ.get('ADMIN_DANA_PASSWORD', 'dana12345')
            }
        ]

        for admin in admins:
            if not User.objects.filter(username=admin['username']).exists():
                User.objects.create_superuser(
                    username=admin['username'],
                    email=admin['email'],
                    password=admin['password']
                )
                self.stdout.write(self.style.SUCCESS(f"Successfully created superuser: {admin['username']}"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Superuser {admin['username']} already exists. Skipping."))
