<?php
session_start();

if(!isset($_SESSION['login']) == "admin"){
  header("Location: index.php");
  die;
}

if (isset($_GET['logout'])) {
  // Destroy the entire session
  session_destroy();
  // Redirect to the login page after logout
  header("Location: index.php");
  exit; // Ensure that no code is executed after the redirection
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Youtube Admin Dashbord</title>
  <link rel="stylesheet" href="style.css" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">


  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
<style>
  .updateInfoHeading{
    background-color: #1e90ff;
  padding: 10px;
  color: white;
}
.updateInfoHeading p {
  background-color: #1e90ff;
  padding: 10px;
  color: white;
}
.logo img{
    width: 20%;
    height: auto;
}
.menuHideBar{
  position: absolute;
  position: ;
  right: -12px;
  background-color: #1e90ff;
  padding: 10px;
  border-radius: 20%;
  top: 17px;
  border: 2px solid white;

}
.adminDashbord{
  position: relative;
  top: 20px;
  width: 100%;
  min-height: 200px;
  background-color:#1e90ff;
  display: flex;
  align-items:center;
}
.modal {
  --bs-modal-width: 90% !important;
}
.spinner {
   width: 11.2px;
   height: 11.2px;
   border-radius: 11.2px;
   box-shadow: 28px 0px 0 0 rgba(71,75,255,0.2), 22.7px 16.5px 0 0 rgba(71,75,255,0.4), 8.68px 26.6px 0 0 rgba(71,75,255,0.6), -8.68px 26.6px 0 0 rgba(71,75,255,0.8), -22.7px 16.5px 0 0 #474bff;
   animation: spinner-b87k6z 1s infinite linear;
   margin: 0 auto;
}

@keyframes spinner-b87k6z {
   to {
      transform: rotate(360deg);
   }
}
</style>
</head>

<body>
<div class="wrapButton">
  <div id="liveAlertPlaceholder"></div>
</div>
        <!-- Modal -->
        <div class="modal fade" id="editModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content modelWidth">
              <div class="modal-header">
                <h1 class="modal-title fs-5 modalId" id="exampleModalLabel">Edit</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body p-2">
                <input class="modalTitle p-2 form-control form-control-lg" type="text" placeholder="Title" aria-label=".form-control-lg example">
                <textarea required="" class="modalDes form-control getVideoDescription" id="exampleFormControlTextarea1" rows="3"></textarea>
                <div class="py-2 group d-flex
                ">
                <div class="updateVideo">
                <select class="form-select videoSelects" aria-label="Default select example">
                  <option disabled selected>Select a Channel</option>
                </select>
              </div>
                  <div class="updateVideo">
              <select class="form-select  videoCatogries" aria-label="Default select example">
                <option disabled selected>Select a catogries</option>
              </select>
            </div>

            <div class="updateVideo">
            <select class="form-select videoType" aria-label="Default select example">
              <option disabled selected>Video type</option>
            </select>
          </div>

                </div>
                <div class="form-check form-switch">
                  <input class="modalChecked form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
                  <label class="form-check-label" for="flexSwitchCheckChecked">Is live</label>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>

  <div class=" main_container">

    <div class="left_div">
    <!-- <div class="menuHideBar">
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
      </div> -->
      <div class="logo d-flex align-items-center">
        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFz1aoq0RnlkDHO6OqApeAWXICc9xFcyqUZndGSfTyzPPDPksfhsYK7s4vEoYZ_Xc2Imeh9yEXbg09WAwEpH41KXANe8wbLqaQFyhMqkVH9_KDvhZ-VkUxzB5ppvwyOh_vEUDkLbPBwrYOgyMC7x9-aN5kF-Q1HB3cOugW5PBtrjXfHQIN15w5cz09LPt6/s16000/T-G%20logos%20only.png" alt="">
        <h3 class="m-0">Techey Guys</h3>
      </div>
      <div class="tabs-container">
        <div class="tab activeBar"><i class="fa-solid fa-house "></i>Dashbord
      </div>
        <div class="tab"><i class="fa-solid fa-plus"></i>Add Videos</div>
        <div class="tab"><i class="fa-solid fa-pen-to-square"></i>Update Info</div>
        <!-- Add more tabs as needed -->
      </div>
    </div>

    <div class="right_div">
        <div class="tab-content active">
      <div class="wrap">
      <div class="d-flex justify-content-between">
          <h3>Welcome admin</h3>
          <a href="/admin/admin.php?logout"><button class="btn btn-danger">Logout</button></a>
      </div>
    </div>
        <div class="adminDashbord text-light">
    <div class="row d-flex w-100">
      <div class="col-4 d-flex justify-content-center align-items-center"><div>
        <h3 class="fs-5">Total Videos</h3>
        <h4 class="fs-2">100</h4>
      </div></div>
      <div class="col-4 d-flex  justify-content-center align-items-center"><div>
      <h3 class="fs-5">Total Live</h3>
        <h4 class="fs-2">100</h4>
      </div></div>
      <div class="col-4 d-flex  justify-content-center align-items-center"><div>
      <h3 class="fs-5">Catogries</h3>
        <h4 class="fs-2">100</h4>
      </div></div>
    </div>
        </div>
        <div class="content">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Edit</th>
                <th scope="col">Id</th>
                <th scope="col">Images</th>
                <th scope="col">title</th>
                <th scope="col">Description</th>
                <th scope="col">channel Name</th>
                <th scope="col">catogries</th>
                <th scope="col">type</th>
                <th scope="col">is live</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
            
          </table>
        <div class="spinner"></div>
        </div>
      </div>

      <div class="tab-content">
        <h3>Add More Videos</h3>
        <div class="addVideos">

        <div class="d-flex w-100">
          <div class="w-50 p-2">
          <p>Video id</p>
          <div class="updateVideo">
            <input required class="form-control form-control-lg getVideoId" type="text" placeholder="video id" aria-label="Enter a value example">
          </div>
          </div>
          <div class="w-50 p-2">
        <p>Video image</p>
          <div class="updateVideo">
            <input required class="form-control form-control-lg getVideoImage" type="text " placeholder="Image url" aria-label="Enter a value example">
          </div>
        </div>
        </div>

        <div class="d-flex w-100">
        <div class="w-50 p-2">
          <p>Video Title</p>
          <div class="updateVideo">
            <input required class="form-control form-control-lg getVideoTitle" type="text " placeholder="Video titile" aria-label="Enter a value example">
          </div>
        </div>
        <div class="w-50 p-2">
         <p>Video Description</p>
          <div class="updateVideo">
            <!-- <input class="form-control form-control-lg getVideoDescription" type="textarea" placeholder="Video Description" aria-label="Enter a value example"> -->
            <textarea required class="form-control getVideoDescriptionInfo" id="exampleFormControlTextarea2" rows="3"></textarea>
          </div>
         </div>
        </div>
         
          <div class="d-flex row">
            <div class="col-4">
              <p>Channel</p>
              <div class="updateVideo">
                <select class="form-select videoSelects" aria-label="Default select example">
                  <option disabled selected>Select a Channel</option>
                </select>
              </div>
            </div>
            <div class="col-4">
            <p>catogries</p>
            <div class="updateVideo">
              <select class="form-select  videoCatogries" aria-label="Default select example">
                <option disabled selected>Select a catogries</option>
              </select>
            </div>
          </div>
          <div class="col-4">
          <p>Type</p>
          <div class="updateVideo">
            <select class="form-select videoType" aria-label="Default select example">
              <option disabled selected>Video type</option>
            </select>
          </div>
        </div>
         </div>
          <p>Islive</p>
          <div class="updateVideo">
            <div class="form-check form-switch">
              <input class="modalChecked form-check-input" type="checkbox" role="switch" id="flexSwitchCheckCheckedAddNew" checked>
              <label class="form-check-label" for="flexSwitchCheckCheckedAddNew">Is live</label>
            </div>
          </div>
          <div class="btn btn-primary updateAjaxCall">Update Video</div>
        </div>
      </div>

      <div class="tab-content">
        <h3>Update Info</h3>
        <div class="updateInfo">
          <div class="row ">

          <div class="col-4">
              <h5 class="updateInfoHeading">Catogries </h5>
              <div class="channelContent updateInfoHeading">
              </div>
              <!-- <div class="d-flex bg-info">
              <input class="form-control" type="text" placeholder="Default input" aria-label="default input example">
                <button class="btn btn-primayy">Add</button>
              </div> -->
            </div>

            <div class="col-4">
              <h5 class="updateInfoHeading">Channel </h5>
              <div class="catogriesContent updateInfoHeading">
              </div>
            </div>

            <div class="col-4">
              <h5 class="updateInfoHeading">Type</h5>
              <div class="typeContent updateInfoHeading">
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>




  <script src="./script.js"></script>
  <script src="./ajax.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
    crossorigin="anonymous"></script>
</body>

</html>

<?php
