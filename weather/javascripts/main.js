(function($) {
    $('[data-action=send]').on('click', function(event) {
        event.preventDefault();
        
        // toggle views
        $('[data-action]').addClass('hide');
        $('[data-action=sending]').removeClass('hide').addClass('disabled');    
        
        var message = $("#message").val();
        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: 'http://localhost:3000/send/' + message,
            complete: function(jqXHR, textStatus) {
                 $('[data-status]').addClass('hide');
                 $('[data-status=sent]').removeClass('hide'); 
                
                // reset views
                $('[data-action]').addClass('hide');
                $('[data-action=send]').removeClass('hide');   
            }
        });
    });
    
	$.ajax({
		dataType: 'json',
		url: 'http://api.openweathermap.org/data/2.5/weather?q=Taipei',
	    success: function(response, jqXHR, textStatus) {
            var data = [];
            var obj = {};
            
            obj.temp = response.main.temp;
            obj.humidity = response.main.humidity;
            obj.name = response.name;
            obj.clouds = response.clouds.all;
            obj.speed = response.wind.speed;  
            
            // Weather Icons
            switch (response.weather[0].main) {
                case "Clouds": obj.weatherIcon = "wi-day-cloudy";
            }
            
            // Celsius
            obj.celsius = parseInt(response.main.temp - 273.15);
            
            data.push(obj);
            
			$('#postTemplate')
				.tmpl(data)
				.appendTo('#content');
            
            //week
            var day_list = ['Sun', 'Mon', 'Tus', 'Wen', 'Thu', 'Fri', 'Sat'];
            var date = new Date();
            var day  = date.getDay(); // or "new Date().getDay()";
            $('#week').text (day_list[day]);
            
	    },
	    complete: function(jqXHR, textStatus) {
            $('#board').createWebSocket({
                // SPA Principle: use callback
                onmessage: function() {
                    $('.timestamp').each(function() {
                        var me = $(this);
                        var timestamp = me.html();

                        me.html(moment(timestamp).fromNow());
                    });
                }
            });
	    }
	});
}) ($);
