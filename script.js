$(document).ready(function(){

   var template_html = $('#day-template').html();
   var template_function = Handlebars.compile(template_html);

   var start_date = '2018-01-01';
   console.log(start_date);
   var start_moment = moment(start_date);
   var firstMonth = 'January';
   var lastMonth = 'December';

   current_month(start_moment, firstMonth , lastMonth);
   holidays(start_moment);

  $("#prev-month").click(function(){
    start_moment.subtract(1,'months');
    current_month(start_moment, firstMonth , lastMonth);
    holidays(start_moment);
  }); // end click next month

  $("#next-month").click(function(){
    start_moment.add(1,'months');
    current_month(start_moment, firstMonth , lastMonth);
    holidays(start_moment);
  }); // end click next month


  function current_month(day_month, a, b){
    $("#calendar").empty();
    var monthDays = day_month.daysInMonth();
    var monthTransformed = day_month.format('MMMM');

    $("#monthCurr").text(monthTransformed);

    var start = a;
    var end = b;

    if(monthTransformed == start){
      $("#prev-month").prop("disabled" , true);
    } else if (monthTransformed == end) {
      $("#next-month").prop("disabled" , true);
    } else {
      $("#prev-month").prop("disabled" , false);
      $("#next-month").prop("disabled" , false);
    }

    for (var i = 1; i <= monthDays; i++) {
      var placehoder = {
         day : i + ' ' + monthTransformed,
         day_key : day_month.format('YYYY-MM-') + day_format(i)
      };
      var html_final = template_function(placehoder);
      $("#calendar").append(html_final);
    }; // end for monthDays
  }; // end function current_month

  function holidays(day_month){
    $.ajax({
      url : 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
      method :'GET',
      data : {
        year : 2018,
        month : day_month.month()
      },
      success : function(data){
        var legaldays = data.response;
        for (var i = 0; i < legaldays.length; i++) {
          var currentlegalday = legaldays[i]
          var date_legalday = currentlegalday.date;
          var name_legalday = currentlegalday.name;

          $('#calendar li[data-day="' + date_legalday + '"]').addClass('red').append(' - ' + name_legalday)
        }
      },
      error : function(){
        alert('error');
      }
    }); // end ajax holidays
  }; // end function holidays

  function day_format(day){
    if(day < 10 ){
      return '0' + day;
    } else {
      return day;
    }
  }; // end day_format function
}); // End Dom
