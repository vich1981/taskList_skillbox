$(function(){

    const appendJob = function(data){
        var jobCode = '<a href="#" class="job-link" data-id="' +
            data.id + '">' + data.number + ' ' + data.name + ' ' + data.serial_number + ' ' +
            data.status + ' ' + data.annotation + '  ' + '</a>';
        var editButton = '<button class= "job-edit" data-id="' + data.id + '">Изменить</button>'
        var delButton = '<button class= "job-delete" data-id="' + data.id + '">Удалить</button><br>';

        $('#job-list')
            .append('<div>' + jobCode + editButton + delButton + '</div>');
    };

//    //Загрузка заданий
//    $.get('/jobs/', function(response)
//    {
//        for(j in response) {
//            var job = {};
//            var taskArray = response[j];
//            taskArray.id = Number(taskArray.number);
//            appendJob(taskArray);
//        }
//    });

    //Показать форму для добавления задайний, по нажатию кнопки добавить задание
    $('#show-add-job-form').click(function(){
        document.getElementById("jobForm").reset();
        $('#job-form').css('display', 'flex');
    });

    //Скрыть форму добавления заданий
    $('#job-form').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    //Получить номер заявки
    $(document).on('click', '.job-link', function(){
        var link = $(this);
        var jobId = link.data('id');
        $.ajax({
            method: "GET",
            url: '/jobs/' + jobId,
            success: function(response)
            {
                var code = '<span>Номер заявки:' + response.number + '</span>';
                link.parent().append(code);
            },
            error: function(response)
            {
                if(response.status == 404) {
                    alert('Книга не найдена!');
                }
            }
        });
        return false;
    });
    //Изменение задания
    $(document).on('click', '.job-edit', function(){
        var link = $(this);
        var jobId = link.data('id');
        console.log(jobId);
        $.ajax({
            method: "GET",
            url: '/jobs/' + jobId,
            success: function(response)
            {
                console.log(response);
                var numberString = response.number;
                document.getElementById("textNumber").value = numberString;
                document.getElementById("textNumber").disabled = true;
                document.getElementById("textName").value = response.name;
                document.getElementById("textSerialNumber").value = response.serial_number;
                document.getElementById("textWorker").value = response.worker;
                document.getElementById("textStatus").value = response.status;
                document.getElementById("textAnnotation").value = response.annotation;
            },
            error: function(response)
            {
                if(response.status == 404) {
                    alert('Задание не найдено!');
                }
            }
        });
        $('#job-form').css('display', 'flex');
        return false;
    });

    //Удаление задания
    $(document).on('click', '.job-delete', function(){
        var link = $(this);
        var jobId = link.data('id');
        $.ajax({
        method: "DELETE",
        url: '/jobs/' + jobId,
        success: function(response)
        {
//          var code = '<span>Заявка удалена!</span>';
//          link.parent().append(code);
            location.reload();
        },
            error: function(response)
            {
               if(response.status == 404) {
                   alert('Задание не найдено!');
               }
            }
        });
        return false;
    });

    //Добавление или изменение задания
    $('#save-job').click(function()
    {
        if(document.getElementById("textNumber").disabled)
        {
            document.getElementById("textNumber").disabled = false;
            var data = $('#job-form form').serialize();
            var jobId = data.number;
            $.ajax({
                method: "put",
                url: '/jobs/' + jobId,
                data: data,
                success: function(response)
                {
                            $('#job-form').css('display', 'none');
                            var job = {};
                            job.id = response;
                            location.reload();
                }
            });
            return false;
        }

        var data = $('#job-form form').serialize();
        $.ajax({
            method: "POST",
            url: '/jobs/',
            data: data,
            success: function(response)
            {
                $('#job-form').css('display', 'none');
                var job = {};
                job.id = response;
                var dataArray = $('#job-form form').serializeArray();

                for(i in dataArray) {
                    job[dataArray[i]['name']] = dataArray[i]['value'];
                }
                location.reload();
//                appendJob(job);
            }
        });
        return false;
    });

});