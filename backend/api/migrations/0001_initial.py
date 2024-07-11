# Generated by Django 4.1.4 on 2024-07-09 10:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('card_holder_name', models.CharField(max_length=255)),
                ('card_number', models.CharField(max_length=16)),
                ('expire', models.DateField()),
                ('cvv', models.CharField(max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=255)),
                ('special_code', models.CharField(blank=True, max_length=255, null=True)),
                ('number_of_tickets', models.IntegerField()),
                ('priority', models.IntegerField(choices=[(1, 'High Priority'), (2, 'Moderate Priority'), (3, 'Low Priority')])),
            ],
        ),
        migrations.CreateModel(
            name='Proxy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('status', models.CharField(choices=[('Active', 'Active'), ('Inactive', 'Inactive')], max_length=50)),
                ('usage', models.CharField(max_length=50)),
                ('ips', models.JSONField()),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('mode', models.CharField(choices=[('bypass', 'Bypass'), ('atc', 'ATC'), ('checkout', 'Checkout')], max_length=20)),
                ('runtime', models.IntegerField(default=0)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('in_progress', 'In Progress'), ('completed', 'Completed')], default='pending', max_length=20)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to=settings.AUTH_USER_MODEL)),
                ('payment_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.paymentprofile')),
                ('ticketmaster_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.profile')),
            ],
        ),
    ]