
var express=require('express');
var app=express();
var cors = require('cors')
var bodyParser = require('body-parser');
var mc = require('./connection');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())
var server=app.listen(8000,function()
{
    console.log(new Date().toISOString().slice(0, 19).replace('T', ' '));
    console.log('I am running node js');
});

app.post('/add_tour', function (req, res) {
    var tour_data = req.body;
    var todays_date =new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(todays_date);
    mc.query("Insert into tours_planned (tour_location,tour_cost,created_on) VALUES ('"+tour_data.location+"','"+tour_data.cost+"','"+todays_date+"')", function (error, results, fields) {
               if (error) {
                    return res.send({'error':true, 'result':error});
               } else{
                    return res.send({'error':false, 'result':'Tour inserted successfully'});
               }
           });
});

app.put('/update_tour/:id', function(req, res){
    var tour_data = req.body;
    var tourid = req.params.id;
    mc.query("Update tours_planned SET tour_location='"+tour_data.location+"',tour_cost='"+tour_data.cost+"' WHERE tour_id='"+tourid+"'" , function (error, results, fields) {
        if (error) {
            return res.send({'error':true, 'result':error});
        } else{
            return res.send({'error':false, 'result':'Tour updated successfully'});
        }
    });
});

app.get('/tours', function(req, res){
    console.log('here');
    mc.query("Select tour_id,tour_location,tour_cost,created_on from tours_planned", function (error, results, fields) {
        if (error) {
             return res.send({'error':true, 'data':{},'msg':error});
        } else{
            return res.send({'error': false, 'data':results});
        }
    });
});

app.get('/tour/:id', function(req, res){
    var tourid = req.params.id;
    mc.query("Select tour_id,tour_location,tour_cost,created_on from tours_planned WHERE tour_id='"+tourid+"'", function (error, results, fields) {
        if (error) {
             return res.send({'error':true, 'data':{},'msg':error});
        } else{
            return res.send({'error': false, 'data':results});
        }
    });
});

app.delete('/delete_tour/:id', function(req, res){
   var tourid = req.params.id;
   mc.query("DELETE FROM tours_planned WHERE tour_id='"+tourid+"'", function (error, results, fields) {
    if (error) {
         return res.send({'error':true, 'msg':error});
    } else{
        return res.send({'error': false, 'msg':'Deleted Successfully'});
    }
});
});
