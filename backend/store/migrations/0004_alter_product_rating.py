# Generated by Django 4.2 on 2024-03-10 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_wishlist_review_productfaq_notification_coupon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='rating',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
    ]
