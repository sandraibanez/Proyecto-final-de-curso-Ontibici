# Generated by Django 5.0.1 on 2024-01-11 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stations',
            name='slug',
        ),
        migrations.AlterField(
            model_name='stations',
            name='name',
            field=models.CharField(default='', max_length=200),
        ),
    ]
