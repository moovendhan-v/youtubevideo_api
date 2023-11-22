document.addEventListener('DOMContentLoaded',()=>{
    var getModelButtons = document.querySelectorAll('.getModel');

    getModelButtons.forEach(function (button) {
        console.log(button);
        button.addEventListener('click', function (e) {
            // Your existing code here
            console.log(e);
    
            var id = button.parentElement.parentElement.cells[1].innerText;
            var image = button.parentElement.parentElement.cells[2].lastChild.src;
            var title = button.parentElement.parentElement.cells[3].innerText;
            var description = button.parentElement.parentElement.cells[4].innerText;
            var cannelid = button.parentElement.parentElement.cells[5].innerText;
            var catogries = button.parentElement.parentElement.cells[6].innerText;
            var type = button.parentElement.parentElement.cells[7].innerText;
            var islive = button.parentElement.parentElement.cells[8].innerText;
    
            document.querySelector('.modalId').innerText = id;
            var modalTitle = document.querySelector('.modalTitle').value = title;
            var modalDes = document.querySelector('.modalDes').value = description;
            var modalChecked = document.querySelector('.modalChecked').checked = islive == 1 ? true : false ;
    
            // var modalChannelId = document.querySelector('.modalDes').value = description;
            console.log(` ${image} ${title} ${description}, ${cannelid}, ${catogries} ${type} ${islive}`);
        });
    });
    
    var getModelButtonss = document.querySelectorAll('.getModel')[0];
    console.log(getModelButtonss);
})

