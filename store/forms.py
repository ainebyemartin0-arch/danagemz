from django import forms
from .models import CustomOrder, Subscriber

class CustomOrderForm(forms.ModelForm):
    class Meta:
        model = CustomOrder
        fields = ['name', 'phone_number', 'description', 'reference_image']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 5, 'placeholder': 'Describe the jewelry piece you want... e.g., "A gold ring with my name engraved"'}),
        }

class SubscriberForm(forms.ModelForm):
    class Meta:
        model = Subscriber
        fields = ['email']
        widgets = {
            'email': forms.EmailInput(attrs={'placeholder': 'Enter your email address'})
        }
