from django.urls import path, include

from userauths import views as userauths_views
from rest_framework_simplejwt.views import TokenRefreshView
from store import views as store_views
from customer import views as customer_views
from vendor import views as vendor_views

urlpatterns = [
    path('dj-rest-auth/google/', userauths_views.GoogleLogin.as_view(), name='google_login'),
    

    path('user/token/', userauths_views.MyTokenOptainPairView.as_view()),
    path('user/token/refresh/', TokenRefreshView.as_view()),
    path('user/register/', userauths_views.RegisterView.as_view()),
    path('user/password-reset/<email>/', userauths_views.PasswordRestEmailVerify.as_view()),
    path('user/password-change/', userauths_views.PasswordChangeView.as_view()),
    path('user/profile/<user_id>/', userauths_views.ProfileView.as_view()),

    # Store Endpoint
    path('category/', store_views.CategoryListAPIView.as_view()),
    path('product/', store_views.ProductListAPIView.as_view()),
    path('product/<slug:slug>/', store_views.ProductDetailAPIView.as_view()),
    path('cart-view/', store_views.CartAPIView.as_view()),
    path('cart-list/<str:cart_id>/<int:user_id>/', store_views.CartListView.as_view()),
    path('cart-list/<str:cart_id>/', store_views.CartListView.as_view()),
    path('cart-detail/<str:cart_id>/<int:user_id>/', store_views.CartDetailView.as_view()),
    path('cart-detail/<str:cart_id>/', store_views.CartDetailView.as_view()),

    path('cart-delete/<str:cart_id>/<int:item_id>/<int:user_id>/',store_views.CartItemDeleteAPIView.as_view()),
    path('cart-delete/<str:cart_id>/<int:item_id>/',store_views.CartItemDeleteAPIView.as_view()),
    path('create-order/',store_views.CreateOrderAPIView.as_view()),
    path('checkout/<order_oid>/',store_views.CheckoutView.as_view()),
    path('coupon/',store_views.CouponAPIView.as_view()),
    path('reviews/<product_id>/',store_views.ReviewListAPIView.as_view()),
    path('search/',store_views.SearchProductAPIView.as_view()),


    #payments

    path('stripe-checkout/<order_oid>/<cart_id>/',store_views.StripeCheckoutView.as_view()),
    path('payment-success/<str:order_oid>/',store_views.PaymentSuccessView.as_view()),

    #Customer Endpoint

    path('customer/orders/<user_id>/',customer_views.OrderAPIView.as_view()),
    path('customer/orders/<user_id>/<order_oid>/',customer_views.OrderDetailAPIView.as_view()),
    path('customer/wishlist/<user_id>/',customer_views.WishListAPIView.as_view()),
    path('customer/notifications/<user_id>/',customer_views.NotificationListAPIView.as_view()),
    path('customer/notifications/<user_id>/<noti_id>/',customer_views.MarkCustomerNotificationAsSeen.as_view()),


    #vendor Dashboard

    path('vendor/stats/<vendor_id>/', vendor_views.DashboardStatsAPIView.as_view()),
    path('vendor-orders-chart/<vendor_id>/', vendor_views.MonthlyOrderChartAPIView),
    path('vendor-products-chart/<vendor_id>/', vendor_views.MonthlyProductChartAPIView),
    path('vendor/products/<vendor_id>/', vendor_views.ProductsAPIView.as_view(), name='vendor-prdoucts'),
    path('vendor/orders/<vendor_id>/', vendor_views.OrdersAPIView.as_view(), name='vendor-orders'),
    path('vendor/orders/<vendor_id>/<order_oid>/', vendor_views.OrderDetailAPIView.as_view(), name='vendor-order-detail'),
    path('vendor/revenue/<vendor_id>/', vendor_views.RevenueAPIView.as_view(), name='vendor-orders'),
    path('vendor-product-filter/<vendor_id>', vendor_views.FilterProductsAPIView.as_view(), name='vendor-product-filter'),
    path('vendor-earning/<vendor_id>/', vendor_views.EarningAPIView.as_view(), name='vendor-product-filter'),
    path('vendor-monthly-earning/<vendor_id>/', vendor_views.MonthlyEarningTracker, name='vendor-product-filter'),
    path('vendor-reviews/<vendor_id>/', vendor_views.ReviewsListAPIView.as_view(), name='vendor-reviews'),
    path('vendor-reviews/<vendor_id>/<review_id>/', vendor_views.ReviewsDetailAPIView.as_view(), name='vendor-review-detail'),
    path('vendor-coupon-list/<vendor_id>/', vendor_views.CouponListAPIView.as_view(), name='vendor-coupon-list'),
    path('vendor-coupon-stats/<vendor_id>/', vendor_views.CouponStats.as_view(), name='vendor-coupon-stats'),
    path('vendor-coupon-detail/<vendor_id>/<coupon_id>/', vendor_views.CouponDetailAPIView.as_view(), name='vendor-coupon-detail'),
    path('vendor-coupon-create/<vendor_id>/', vendor_views.CouponCreateAPIView.as_view(), name='vendor-coupon-create'),
    path('vendor-notifications-unseen/<vendor_id>/', vendor_views.NotificationUnSeenListAPIView.as_view(), name='vendor-notifications-list'),
    path('vendor-notifications-seen/<vendor_id>/', vendor_views.NotificationSeenListAPIView.as_view(), name='vendor-notifications-list'),
    path('vendor-notifications-summary/<vendor_id>/', vendor_views.NotificationSummaryAPIView.as_view(), name='vendor-notifications-summary'),
    path('vendor-notifications-mark-as-seen/<vendor_id>/<noti_id>/', vendor_views.NotificationMarkAsSeen.as_view(), name='vendor-notifications-mark-as-seen'),
    path('vendor-settings/<int:pk>/', vendor_views.VendorProfileUpdateView.as_view(), name='vendor-settings'),
    path('vendor-shop-settings/<int:pk>/', vendor_views.ShopUpdateView.as_view(), name='customer-settings'),
    path('shop/<vendor_slug>/', vendor_views.ShopAPIView.as_view(), name='shop'),
    path('vendor-products/<vendor_slug>/', vendor_views.ShopProductsAPIView.as_view(), name='vendor-products'),




]
