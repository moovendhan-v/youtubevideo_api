<?php
session_start();

include __DIR__.'/lib/load.php';

cron::runCron();

