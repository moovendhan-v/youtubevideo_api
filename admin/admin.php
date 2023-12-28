<?php
session_start();

if (!isset($_SESSION['login']) == "admin") {
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
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

  <link rel="stylesheet" href="style.css" />

  <style>

  </style>
</head>

<body class="bg-image bg-theme">

  <div class="wrapButton">
    <div id="liveAlertPlaceholder"></div>
  </div>

  <!-- Modal -->
  <div class="modal fade bg-image " id="editModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog card-blur rounded">
      <div class="modal-content modelWidth ">
        <div class="modal-header">
          <h1 class="modal-title fs-5 modalId" id="exampleModalLabel">Edit</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-2">
          <input class="modalTitle p-2 form-control form-control-lg" type="text" placeholder="Title"
            aria-label=".form-control-lg example">
          <input class="modalImage p-2 form-control form-control-lg" type="text" placeholder="Image"
            aria-label=".form-control-lg example">
          <textarea required="" class="modalDes form-control getVideoDescription" id="exampleFormControlTextarea1"
            rows="3"></textarea>
          <div class="py-2 group d-flex
                ">
            <div class="updateVideo">
              <select class="form-select videoSelects modelVideoSelects" aria-label="Default select example">
              </select>
            </div>
            <div class="updateVideo">
              <select class="form-select  videoCatogries modelVideoCatogries" aria-label="Default select example">
              </select>
            </div>

            <div class="updateVideo">
              <select class="form-select videoType modelVideoType" aria-label="Default select example">
              </select>
            </div>
          </div>
          <div class="form-check form-switch">
            <input class="modalChecked form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked"
              checked>
            <label class="form-check-label" for="flexSwitchCheckChecked">Is live</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary updateVideoDetails" data-bs-dismiss="modal">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <!-- add video by url  -->
  <div class="modal fade bg-image " id="editVideoByUrl" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog card-blur rounded">
      <div class="modal-content ">
        <div class="modal-header">
          <h1 class="modal-title fs-5 modalId" id="exampleModalLabel">Add video by url</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-2">
          <input id="getVideoDetaialByUrl" class="getVideoDetaialByUrl modalTitle p-2 form-control form-control-lg"
            type="text" placeholder="Enter A Youtbe Video Url" aria-label=".form-control-lg example">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary updateVideoDetailsByurl" data-bs-dismiss="modal">Save
            changes</button>
        </div>
      </div>
    </div>
  </div>

  <div class="mobileNav">
    <div><i class="burgerMenu fa-solid fa-bars"></i></div>
  </div>
  <div class=" main_container">

    <div class="left_div closeBugermenu card-blur">
      <!-- <div class="menuHideBar">
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
      </div> -->

      <div class="logo d-flex align-items-center card-blur mb-0">
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFz1aoq0RnlkDHO6OqApeAWXICc9xFcyqUZndGSfTyzPPDPksfhsYK7s4vEoYZ_Xc2Imeh9yEXbg09WAwEpH41KXANe8wbLqaQFyhMqkVH9_KDvhZ-VkUxzB5ppvwyOh_vEUDkLbPBwrYOgyMC7x9-aN5kF-Q1HB3cOugW5PBtrjXfHQIN15w5cz09LPt6/s16000/T-G%20logos%20only.png"
          alt="">
        <h3 class="m-0">Techey Guys</h3>
      </div>

      <div class="top-menu">

        <div class="tabs-container">
          <div class="tab activeBar"><i class="fa-solid fa-house text-primary"></i>Dashbord
          </div>
          <div class="tab"><i class="fa-solid fa-plus text-success"></i>Add Videos</div>
          <div class="tab"><i class="fa-solid fa-pen-to-square text-warning"></i>Update Info</div>
          <hr>
          <div class="tab"><i class="fa-brands fa-google text-info"></i>Agricreations</div>
          <div class="tab"><i class="fa-brands fa-youtube text-danger"></i>Youtube</div>
          <hr>
          <div class="tab"><i class="fa-solid fa-rss text-warning"></i>Rss Feeder</div>
          <hr>
          <div class="tab"><i class="fa-solid fa-database text-primary"></i>Notion</div>
          <!-- Add more tabs as needed -->
        </div>

      </div>

      <div class="bottom-menu bg-danger">
        <i class="fa-solid fa-right-from-bracket"></i>
        <a href="/admin/admin.php?logout">
          <p>Logout </p>
        </a>
      </div>

    </div>

    <div class="right_div closeBugermenu">
      <!-- Dashbord  -->
      <div class="tab-content active">
        <div class="wrap card-blur rounded p-2">
          <div class="d-flex justify-content-between align-item-center">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="text-uppercase mb-0 d-flex justify-content-between">Welcome admin</h6>
              <hr>
            </div>
            <a href="/admin/admin.php?logout"><button class="btn btn-danger"><i
                  class="fa-solid fa-right-from-bracket"></i> Logout</button></a>
          </div>
        </div>

        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 my-3">
          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Total Videos</p>
                    <h4 class="my-1 dashbordTotalVideos">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-chrome"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Total live</p>
                    <h4 class="my-1 dashbordTotalLive">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-github"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Total catogries</p>
                    <h4 class="my-1 dashbordTotalCatogries ">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-firefox"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Subscribers</p>
                    <h4 class="my-1 ">⏳</h4>
                    <div>⏳</div>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-shopify"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="content  card-body">
          <div class="text">
            <h6>Latest</h6>
            <hr>
            <div class="row my-3">
              <div class="col-6">
                <button type="button" class="p-1 me-2 mb-3 btn btn-secondary" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="All Added videos">
                  All Videos
                </button>
                <button type="button" class="p-1 me-2 mb-3 btn btn-secondary" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="All Added videos">
                  Live
                </button>
                <button type="button" class="p-1 me-2 mb-3 btn btn-secondary" data-bs-toggle="tooltip"
                  data-bs-placement="top" title="All Added videos">
                  Not Live
                </button>
              </div>
              <div class="col-6">
                <div class="search-bar flex-grow-1">
                  <div class="position-relative search-bar-box">
                    <input type="text" class="form-control search-control" placeholder="Type to search..."> <span
                      class="position-absolute top-50 search-show translate-middle-y">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <table class="table card-blur ">
            <thead>
              <tr class="table-light ">
                <th scope="col">Edit</th>
                <th scope="col" class=" display-none">Id</th>
                <th scope="col">Images</th>
                <th scope="col">title</th>
                <th scope="col">Description</th>
                <th scope="col">Channel</th>
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
      <!-- All Videos  -->
      <div class="tab-content">
        <h6 class="text-uppercase">Add More Videos</h6>
        <hr>
        <div class="addVideos card-blur p-2 rounded">

          <div class="d-flex w-100">
            <div class="w-50 p-2">
              <p>Video id</p>
              <div class="updateVideo">
                <input required class="custom-placeholder form-control form-control-lg getVideoId " type="text"
                  placeholder="video id" aria-label="Enter a value example">
              </div>
            </div>
            <div class="w-50 p-2">
              <p>Video image</p>
              <div class="updateVideo">
                <input required class="custom-placeholder form-control form-control-lg getVideoImage " type="text "
                  placeholder="Image url" aria-label="Enter a value example">
              </div>
            </div>
          </div>

          <div class="d-flex w-100">
            <div class="w-50 p-2">
              <p>Video Title</p>
              <div class="updateVideo">
                <input required class="custom-placeholder form-control form-control-lg getVideoTitle " type="text "
                  placeholder="Video titile" aria-label="Enter a value example">
              </div>
            </div>
            <div class="w-50 p-2">
              <p>Video Description</p>
              <div class="updateVideo">
                <!-- <input class="form-control form-control-lg getVideoDescription" type="textarea" placeholder="Video Description" aria-label="Enter a value example"> -->
                <textarea required class=" custom-placeholder form-control getVideoDescriptionInfo "
                  id="exampleFormControlTextarea2" rows="3"></textarea>
              </div>
            </div>
          </div>

          <div class="d-flex row">
            <div class="col-sm-4 ">
              <p>Channel</p>
              <div class="updateVideo">
                <select class="form-select videoSelectss" aria-label="Default select example">
                  <option disabled selected>Select a Channel</option>
                </select>
              </div>
            </div>
            <div class="col-sm-4 ">
              <p>catogries</p>
              <div class="updateVideo">
                <select class="form-select  videoCatogriess" aria-label="Default select example">
                  <option disabled selected>Select a catogries</option>
                </select>
              </div>
            </div>
            <div class="col-sm-4 ">
              <p>Type</p>
              <div class="updateVideo">
                <select class="form-select videoTypess" aria-label="Default select example">
                  <option disabled selected>Video type</option>
                </select>
              </div>
            </div>
          </div>
          <p>Islive</p>
          <div class="updateVideo">
            <div class="form-check form-switch">
              <input class="modalChecked form-check-input" type="checkbox" role="switch"
                id="flexSwitchCheckCheckedAddNew" checked>
              <label class="form-check-label" for="flexSwitchCheckCheckedAddNew">Is live</label>
            </div>
          </div>
          <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#editVideoByUrl">Add by url</button>
          <div class="btn btn-primary updateAjaxCall">Update Video</div>
        </div>
      </div>
      <!-- Update Info  -->
      <div class="tab-content">
        <div class="row">
          <!-- catogries  -->
          <div class="col-4 col-xl-4 d-flex">
            <div class="card radius-10 w-100">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <h5 class="mb-0">Catogries</h5>
                  </div>
                  <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                  </div>
                </div>
              </div>
              <div class="custom-list p-3 mb-3 ps ps--active-y">
                <!-- //catogries  -->
                <div class="custom-list-item d-flex align-items-center mb-0 rounded card-blur p-2 cursor-pointer">
                  <div class="ms-2">
                    <div class="channelContent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- channel  -->
          <div class="col-4 col-xl-4 d-flex">
            <div class="card radius-10 w-100">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <h5 class="mb-0">Catogries</h5>
                  </div>
                  <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                  </div>
                </div>
              </div>
              <div class="custom-list p-3 mb-3 ps ps--active-y">
                <!-- //catogries  -->
                <div class="custom-list-item d-flex align-items-center mb-0 rounded card-blur p-2 cursor-pointer">
                  <div class="ms-2">
                    <div class="catogriesContent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- video type  -->
          <div class="col-4 col-xl-4 d-flex">
            <div class="card radius-10 w-100">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <h5 class="mb-0">Catogries</h5>
                  </div>
                  <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                  </div>
                </div>
              </div>
              <div class="custom-list p-3 mb-3 ps ps--active-y">
                <!-- //catogries  -->
                <div class="custom-list-item d-flex align-items-center mb-0 rounded card-blur p-2 cursor-pointer">
                  <div class="ms-2">
                    <div class="typeContent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Agricreations  -->
      <div class="tab-content">
        <h6 class="text-uppercase">Agricreations Dashbord</h6>
        <hr>

<!-- <div class='parent'><div class="magicpattern"></div> -->

        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 my-3">
          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Today Visitors</p>
                    <h4 class="my-1 dashbordTotalVideos">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-chrome"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Last Month Views</p>
                    <h4 class="my-1 dashbordTotalLive">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-github"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Last Year Views</p>
                    <h4 class="my-1 dashbordTotalCatogries">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-firefox"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Total Views</p>
                    <h4 class="my-1 ">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-shopify"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- visitors History  -->
        <div class="card radius-10">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div>
                <h5 class="mb-0">Recent Visitors</h5>
              </div>
              <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
              </div>
            </div>
            <hr>
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Visit-Id</th>
                    <th>Browser</th>
                    <th>Date</th>
                    <th>Country</th>
                    <th>IP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#1234</td>
                    <td><i class="fa-brands fa-firefox-browser"></i></td>
                    <td>12 Jul 2020</td>
                    <td>United State</td>
                    <td>192.168.1.1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <hr class="text-warning">

        <div class="row">
          <div class="col-4 ">
            <!-- Subscribed Emails  -->
            <div class="card radius-10 ">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <h5 class="mb-0">Subscribers</h5>
                  </div>
                  <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                  </div>
                </div>
                <hr>
                <div class="table-responsive">
                  <table class="table align-middle mb-0">
                    <thead class="table-light">
                      <tr>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody class="h-300">
                      <tr>
                        <td>Email</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-8">
            <!-- Contact Forms -->
            <div class="card radius-10 ">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <h5 class="mb-0">Contacted Info</h5>
                  </div>
                  <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                  </div>
                </div>
                <hr>
                <div class="table-responsive">
                  <table class="table align-middle mb-0">
                    <thead class="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody class="h-300">
                      <tr>
                        <td>Moovendhan</td>
                        <td>moovendhan@agricreations.com</td>
                        <td>Sample Messages</td>
                      </tr>
                      <tr>
                        <td>Moovendhan</td>
                        <td>moovendhan@agricreations.com</td>
                        <td>Sample Messages</td>
                      </tr>
                      <tr>
                        <td>Moovendhan</td>
                        <td>moovendhan@agricreations.com</td>
                        <td>Sample Messages</td>
                      </tr>
                      <tr>
                        <td>Moovendhan</td>
                        <td>moovendhan@agricreations.com</td>
                        <td>Sample Messages</td>
                      </tr>
                      <tr>
                        <td>Moovendhan</td>
                        <td>moovendhan@agricreations.com</td>
                        <td>Sample Messages</td>
                      </tr>
                      <tr>
                        <td>Moovendhan</td>
                        <td>moovendhan@agricreations.com</td>
                        <td>Sample Messages</td>
                      </tr>
                      <tr>
                        <td>Moovendhan</td>
                        <td>moovendhan@agricreations.com</td>
                        <td>Sample Messages</td>
                      </tr>
                      <tr>
                        <td>Moovendhan</td>
                        <td>moovendhan@agricreations.com</td>
                        <td>Sample Messages</td>
                      </tr>
                      <tr>
                        <td>Moovendhan</td>
                        <td>moovendhan@agricreations.com</td>
                        <td>Sample Messages</td>
                      </tr>
                      <tr>
                        <td>Moovendhan</td>
                        <td>moovendhan@agricreations.com</td>
                        <td>Sample Messages</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- Youtube -->
      <div class="tab-content">
        <h6 class="text-uppercase">Youtube Dashbord</h6>
        <hr>

        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 my-3">
          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Today Visitors</p>
                    <h4 class="my-1 dashbordTotalVideos">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-chrome"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Last Month Views</p>
                    <h4 class="my-1 dashbordTotalLive">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-github"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Last Year Views</p>
                    <h4 class="my-1 dashbordTotalCatogries">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-firefox"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card radius-10 card-blur">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div>
                    <p class="mb-0">Total Views</p>
                    <h4 class="my-1 ">⏳</h4>
                  </div>
                  <div class="ms-auto font-35 text-white"><i class="bx bxl-shopify"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <h6 class="text-uppercase">Hkr Agri Techs</h6>
        <hr>

        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 my-3">
          <div class="col">
          <div class="card radius-10 ">
              <div class="card-body ">
                <div class="d-flex align-items-center p-2">
                  <div>
                    <h5 class="mb-0">Recent Subscribers</h5>
                  </div>
                  <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                  </div>
                </div>
                <hr>
                <div class="overflow-scrool">
                  <div class="h-300">
                  <div class="d-flex align-items-center p-2">
												<div class="">
													<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCH-3_SqeMgUiRQagUmhCpKgwbecRKlEdT65Rps63k0Vm48wXtUY6f4kS1uJZXOs24FLdBtUf5jezktSPOQEH9pQlHw6bCkRm23D5uoV-As2-Z3yfCqx2UgeXy_qeB9_GWMWpZucG4F8GEzck06DitIvaF3PCcRV3QP3y8RoKm-BAnLni5QUa4FrZ82mcF/s16000/moovendhan_service_webdev.png" class="rounded-circle" width="40" height="40" alt="">
												</div>
												<div class="ms-2">
													<h6 class="mb-0 font-14">Agricreations</h6>
												</div>
											</div>  <div class="d-flex align-items-center p-2">
												<div class="">
													<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCH-3_SqeMgUiRQagUmhCpKgwbecRKlEdT65Rps63k0Vm48wXtUY6f4kS1uJZXOs24FLdBtUf5jezktSPOQEH9pQlHw6bCkRm23D5uoV-As2-Z3yfCqx2UgeXy_qeB9_GWMWpZucG4F8GEzck06DitIvaF3PCcRV3QP3y8RoKm-BAnLni5QUa4FrZ82mcF/s16000/moovendhan_service_webdev.png" class="rounded-circle" width="40" height="40" alt="">
												</div>
												<div class="ms-2">
													<h6 class="mb-0 font-14">Moovendhan</h6>
												</div>
											</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col">
          <div class="card radius-10 ">
              <div class="card-body ">
                <div class="d-flex align-items-center p-2">
                  <div>
                    <h5 class="mb-0">Recent Comments</h5>
                  </div>
                  <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                  </div>
                </div>
                <hr>
                <div class="overflow-scrool">
                  <div class="h-300">
                  <div class="d-flex align-items-center p-2">
												<div class="">
													<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCH-3_SqeMgUiRQagUmhCpKgwbecRKlEdT65Rps63k0Vm48wXtUY6f4kS1uJZXOs24FLdBtUf5jezktSPOQEH9pQlHw6bCkRm23D5uoV-As2-Z3yfCqx2UgeXy_qeB9_GWMWpZucG4F8GEzck06DitIvaF3PCcRV3QP3y8RoKm-BAnLni5QUa4FrZ82mcF/s16000/moovendhan_service_webdev.png" class="rounded-circle" width="40" height="40" alt="">
												</div>
												<div class="ms-2">
													<h6 class="mb-0 font-14">Agricreations</h6>
												</div>
											</div>  <div class="d-flex align-items-center p-2">
												<div class="">
													<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCH-3_SqeMgUiRQagUmhCpKgwbecRKlEdT65Rps63k0Vm48wXtUY6f4kS1uJZXOs24FLdBtUf5jezktSPOQEH9pQlHw6bCkRm23D5uoV-As2-Z3yfCqx2UgeXy_qeB9_GWMWpZucG4F8GEzck06DitIvaF3PCcRV3QP3y8RoKm-BAnLni5QUa4FrZ82mcF/s16000/moovendhan_service_webdev.png" class="rounded-circle" width="40" height="40" alt="">
												</div>
												<div class="ms-2">
													<h6 class="mb-0 font-14">Moovendhan</h6>
												</div>
											</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 col-xl-6">
          <div class="card radius-10 ">
              <div class="card-body max-height-300">
                <div class="d-flex align-items-center">
                  <div>
                    <h5 class="mb-0">Channel Analytics</h5>
                  </div>
                  <div class="font-22 ms-auto"><i class="bx bx-dots-horizontal-rounded"></i>
                  </div>
                </div>
                <hr>
                <div class="overflow-scrool">
                  <div class="h-300">
                   <div class="p-2">
                    <p>Done</p>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        

        </div>

      </div>
      <!-- Rss Feeder  -->
      <div class="tab-content">
        <h6 class="text-uppercase">Rss Feeder</h6>
        <hr>
        <div class="card radius-10">
  <div class="card-body">
    <div class="d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Random Tech News</h5>
      <div class="font-22"><i class="bx bx-dots-horizontal-rounded"></i></div>
    </div>
    <hr>
    <div class="">
      <div class="row">
        <div class="col-12 py-2 bg-head">
          <div class="row">
            <div class="col-2">Source</div>
            <div class="col-6">Title</div>
            <div class="col-4">Date</div>
          </div>
        </div>
        <div class="col-12 py-2">
          <div class="row">
            <div class="col-2"><a href="#">Techverge.com</a></div>
            <div class="col-6">Tech News</div>
            <div class="col-4">12 Jul 2020</div>
          </div>
          <!-- Add more rows as needed -->
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
      <!-- Notion -->
      <div class="tab-content">
        <h6 class="text-uppercase">Notion Dashbord</h6>
        <hr>
      </div>
    </div>
  </div>


  <!-- jQuery CDN (latest version) -->
  <script src="https://code.jquery.com/jquery.min.js"></script>

  <script src="./js/script.js"></script>
  <script src="./js/ajax.js"></script>
  <script src="./js/app.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
    crossorigin="anonymous"></script>
  <script>
    $(document).ready(function () {
      $('.updateVideoDetailsByurl').on('click', function () {
        getVideoDetailsByUrl();
      });
    });
  </script>
  <script>
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  </script>

</body>

</html>

<?php
