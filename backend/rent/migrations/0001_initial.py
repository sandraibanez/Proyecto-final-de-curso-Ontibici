# Generated by Django 5.0.1 on 2024-02-05 18:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('stations', '0006_alter_bicis_slug'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Rent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('initial_date', models.DateTimeField(auto_now_add=True)),
                ('end_date', models.DateTimeField(null=True)),
                ('bici', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bici', to='stations.bicis')),
                ('end_slot', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='end_slot', to='stations.slot')),
                ('initial_slot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='start_slot', to='stations.slot')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
