const dataSet = []
const data = localStorage.getItem('dataSet');

$(document).ready(function() {
    console.log(data)
    var t = $('#example').DataTable( {
        ordering: 'false',
        data: JSON.parse(data),
        columns: [
            { title: "full_name", data: "full_name"},
            { title: "email", data: "email" },
            { title: "age", data: "age"}
        ]
    })

    $('#example tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );

    $('#addRow').on('click', function () {
        $('#myModal').modal('show');
    });

    $('#onClose').on('click', function () {
        $('#myModal').modal('hide');
        $('input[name="fullName"]').val(null);
        $('input[name="email"]').val(null);
        $('input[name="age"]').val(null);
    })

    $('#onSub').on('click', function () {
        let full_name = $('#full_name').val();
        let email = $('#email').val();
        let age = $('#age').val();

        let entry = {full_name, email, age}

        t.row.add({ full_name: full_name, email: email, age: age}).draw();

        let getDataSet = localStorage.getItem('dataSet');

        let res = JSON.parse(getDataSet);
        res.push(entry);
        localStorage.setItem('dataSet', JSON.stringify(res));


        $('#myModal').modal('hide');

        $('input[name="fullName"]').val(null);
        $('input[name="email"]').val(null);
        $('input[name="age"]').val(null);

        t.order([0, 'asc']).draw();
    })

    $('#removeRow').on('click', function () {
        if (t.rows('.selected')['0'].length !== 0) {
            if (confirm('Are you sure you want to delete selected rows?')) {
                const rows = t.rows('.selected').remove().draw();
                let getDataSet = localStorage.getItem('dataSet');
                let res = JSON.parse(getDataSet);
                if (rows['0'].length > 1) {
                    for (const value of rows['0']) {
                        res.splice(value, 1);
                    }
                } else if (rows['0'].length !== 0) {
                    res.splice(rows['0'], 1);
                }
                localStorage.setItem('dataSet', JSON.stringify(res));
            }
        }
    }
    )

    $('#Edit').on('click', function () {
        $('#updateModal').modal('show');
        const rows = t.rows('.selected')['0'];
        let getDataSet = localStorage.getItem('dataSet');
        let res = JSON.parse(getDataSet);
        let fullName = res[rows].full_name
        const email = res[rows].email
        const age = res[rows].age
        $('input[name="_fullName"]').val(fullName);
        $('input[name="_email"]').val(email);
        $('input[name="_age"]').val(age);

    })

    $('#Upd').on('click', function () {
        const rows = t.rows('.selected')['0'];
        let rowsRemove = t.rows().remove().draw();
        let full_name = $('#_full_name').val();
        let email = $('#_email').val();
        let age = $('#_age').val();
        let getDataSet = localStorage.getItem('dataSet');

        let res = JSON.parse(getDataSet);
        res[rows].full_name = full_name;
        res[rows].email = email;
        res[rows].age = age;

        localStorage.setItem('dataSet', JSON.stringify(res));
        let getItems = localStorage.getItem('dataSet');
        let parsed = JSON.parse(getItems);
        let updateItems = t.rows.add(parsed).draw();

        $('#updateModal').modal('hide');

    })

    $('#Close').on('click', function () {
        $('#updateModal').modal('hide');
    })

    $(document).keydown(function(event) {
        if (event.keyCode == 27) {
            $('#updateModal').modal('hide');
            $('#myModal').modal('hide');
            $('input[name="fullName"]').val(null);
            $('input[name="email"]').val(null);
            $('input[name="age"]').val(null);
        }
    });

})





