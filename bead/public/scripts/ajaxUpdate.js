var $form = $('#updateBookForm');
$form.on('submit', function (ev) {
    ev.preventDefault();

    var url = '/ajax' + $(this).attr('action');
    const data = $(this).serializeArray()
    var _resolve = function () {
        const headers = {
            'csrf-token': $('[name="_csrf"]').val()
        }

        $.ajax({
            url,
            method: 'POST',
            data,
            dataType: 'json',
            headers
        })
            .done(function (data) {
                location.assign('/')
            })
            .fail(function (err) {
                $('.help-block').text(err)
            })
        
        $modal.modal('hide');
    }

    var _reject = function () {
        $modal.modal('hide');
    }
    
    var $modal = $('#updateConfirmModal');
    $modal.modal('show');
    $modal.find('.modal-ok').on('click', _resolve)
    $modal.find('.modal-cancel').on('click', _reject)
})