# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-04-01 19:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wiseturn', '0004_auto_20190326_0221'),
    ]

    operations = [
        migrations.AddField(
            model_name='wtuser',
            name='birthday',
            field=models.DateTimeField(default='1970-01-01'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='wtuser',
            name='city',
            field=models.CharField(default='Toronto', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='wtuser',
            name='country_of_origin',
            field=models.CharField(default='Canada', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='wtuser',
            name='education_level',
            field=models.CharField(default='High School', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='wtuser',
            name='grade',
            field=models.IntegerField(default=90),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='wtuser',
            name='phonenumber',
            field=models.IntegerField(default=1234567890),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='wtuser',
            name='zippostal',
            field=models.CharField(default='A1A1A1', max_length=255),
            preserve_default=False,
        ),
    ]