from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Product
from .forms import CustomOrderForm, SubscriberForm

def home(request):
    products = Product.objects.filter(is_available=True).order_by('-created_at')
    
    if request.method == 'POST':
        form = SubscriberForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Welcome to the Dana Gemz VIP Club! Check your inbox.')
            return redirect('store:home')
    else:
        form = SubscriberForm()

    context = {
        'products': products,
        'form': form
    }
    return render(request, 'index.html', context)

def custom_order(request):
    if request.method == 'POST':
        form = CustomOrderForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your custom order request has been submitted! We will contact you on WhatsApp shortly.')
            return redirect('store:custom_order')
    else:
        form = CustomOrderForm()

    context = {'form': form}
    return render(request, 'custom_order.html', context)
