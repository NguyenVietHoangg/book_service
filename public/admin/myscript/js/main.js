$(document).ready(function(){
    $('#box-filter .form-filter input[name]').keydown(function(event) {
        if ( event.which == 13 ) {
            $('#box-filter .form-filter #filter').click();
        }
    });
    // $('.datepicker').datepicker({
    //   autoclose: true
    // })
    // $('.reservation').daterangepicker()
    // $('.reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, locale: { format: 'DD/MM/YYYY hh:mm A' }})
    // $('.daterange-btn').daterangepicker(
    //   {
    //     ranges   : {
    //       'Today'       : [moment(), moment()],
    //       'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    //       'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
    //       'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    //       'This Month'  : [moment().startOf('month'), moment().endOf('month')],
    //       'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    //     },
    //     startDate: moment().subtract(29, 'days'),
    //     endDate  : moment()
    //   },
    //   function (start, end) {
    //     $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    //   }
    // )
    // $('.input-group .timepicker').timepicker({
    //   showInputs: false
    // });
    // $('.sidebar-menu .treeview .treeview-menu li.active').parent().show().parent().addClass('active menu-open');
});

// var $summernote = $('.summernote').summernote({
//   height: 600,   //set editable area's height
//   codemirror: { // codemirror options
//     theme: 'monokai',
//     lineWrapping: true
//   },
//   callbacks: { onImageUpload: function(files, editor, welEditable) {
//     console.log('files', files);
//     sendFile(files[0], editor, welEditable);
//     }
//   }
// });

// function sendFile(file, editor, welEditable) {
//   console.log('send', file);
//   data = new FormData();
//   data.append("file", file);
//   $.ajax({
//       data: data,
//       type: "POST",
//       url: "/admin/media/add?type=form",
//       cache: false,
//       contentType: false,
//       processData: false,
//       success: function(res) {
//           // editor.insertImage(welEditable, url);
//           $('.summernote').summernote('editor.insertImage', res.link);
//       }
//   });
// }