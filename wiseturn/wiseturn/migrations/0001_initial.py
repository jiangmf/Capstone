# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-03-07 23:31
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import wiseturn.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='WTUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('uid', models.CharField(default=wiseturn.models.hex_uuid, max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(default=wiseturn.models.hex_uuid, max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('dli_number', models.CharField(max_length=255)),
                ('founded', models.IntegerField(null=True)),
                ('type', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('city', models.CharField(blank=True, max_length=255)),
                ('country', models.CharField(blank=True, max_length=255)),
                ('postal', models.CharField(blank=True, max_length=255)),
                ('province', models.CharField(blank=True, max_length=255)),
                ('street', models.CharField(blank=True, max_length=255)),
                ('cost_of_living', models.DecimalField(decimal_places=2, max_digits=10)),
                ('logo', models.ImageField(upload_to=wiseturn.models.institution_directory_path)),
                ('latitude', models.FloatField(null=True)),
                ('longitude', models.FloatField(null=True)),
                ('slug', models.CharField(max_length=255, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(default=wiseturn.models.hex_uuid, max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('tuition', models.DecimalField(decimal_places=2, max_digits=10)),
                ('level', models.CharField(max_length=255)),
                ('discipline', models.CharField(max_length=255)),
                ('application_fee', models.DecimalField(decimal_places=2, max_digits=10)),
                ('slug', models.CharField(max_length=255, unique=True)),
                ('institution', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='wiseturn.Institution')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
