<?php
session_start();

include "lib/load.php";
loadTemplate("head");

if(isset($_SESSION['login']) == "admin"){
    header("Location: admin.php");
   
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['id']) && isset($_POST['pass'])) {
        if ($_POST['id'] == 'admin' && $_POST['pass'] == 'admin') {
            $_SESSION['login'] = "admin";
            header("Location: admin.php");
        }
    }
}
?>
<style>
    .container {
        width: 50%;
    }

</style>
<pre><?php print_r($_SESSION['login']) ?></pre>

<div class="container text-center">

    <form action="index.php" method="post">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input name='id' class="form-control">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input name='pass' type="password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>
