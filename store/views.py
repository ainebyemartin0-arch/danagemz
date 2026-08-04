from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from .models import Product
from .forms import CustomOrderForm, SubscriberForm

def home(request):
    products = Product.objects.filter(is_available=True).order_by('-created_at')[:6]
    if request.method == 'POST':
        form = SubscriberForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Welcome to the Dana Gemz VIP Club!')
            return redirect('store:home')
    else:
        form = SubscriberForm()
    context = {'products': products, 'form': form}
    return render(request, 'index.html', context)

def shop(request):
    products = Product.objects.filter(is_available=True).order_by('-created_at')
    context = {'products': products}
    return render(request, 'shop.html', context)

def cart(request):
    return render(request, 'cart.html')

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk, is_available=True)
    context = {'product': product}
    return render(request, 'product_detail.html', context)

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def policies(request):
    return render(request, 'policies.html')

def custom_order(request):
    if request.method == 'POST':
        form = CustomOrderForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your custom order request has been submitted!')
            return redirect('store:custom_order')
    else:
        form = CustomOrderForm()
    context = {'form': form}
    return render(request, 'custom_order.html', context)
