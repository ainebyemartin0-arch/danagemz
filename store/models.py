from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Rings', 'Rings'),
        ('Necklaces', 'Necklaces'),
        ('Bracelets', 'Bracelets'),
        ('Earrings', 'Earrings'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Necklaces')
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CustomOrder(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    description = models.TextField()
    reference_image = models.ImageField(upload_to='custom_orders/', blank=True, null=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Custom Order by {self.name}"

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
