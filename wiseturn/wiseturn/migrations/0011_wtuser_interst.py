# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-04-12 23:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wiseturn', '0010_auto_20190407_2138'),
    ]

    operations = [
        migrations.AddField(
            model_name='wtuser',
            name='interst',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]