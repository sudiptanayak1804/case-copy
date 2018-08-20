$(function(){$('#myButton').on('click', function(e){
	try{
 	$(this).prop('disabled', true);
 	console.log();
 	$("#loader").show();

 	
 	console.log('click');
 	var error = false;
 	$('#error').text('');
 	$('#success').text('');
 	$('#errorsource').hide();
 	$('#errortarget').hide();
    if($('#salesforceid').val().length === 0 || $('#salesforceid').val().length !== 18 || $('#caseid').val().length === 0 || 
     	$('#caseid').val().length !== 18 || $('#contactid').val().length === 0 || $('#contactid').val().length !== 18) {
     	$('#errorId').show();
     	error = true;
     }
     if($('#namesource').val().length === 0 || $('#pwsource').val().length === 0 || $('#stsource').val().length === 0 || $('#urlsource').val().length === 0) {
     	$('#errorsource').show();
     	error = true;
     }
     if($('#nametarget').val().length === 0 || $('#pwtarget').val().length === 0 || $('#sttarget').val().length === 0 || $('#urltarget').val().length === 0) {
     	$('#errortarget').show();
     	error = true;
     }
     if(error) {
     	$(this).prop('disabled', false);
     	$("#loader").hide();
     	return;
     }
     var sourcedomain = $('#urlsource').val() !== null ? $('#urlsource').val().split('https://').pop() : '';
     var targetdomain = $('#urltarget').val() !== null ? $('#urltarget').val().split('https://').pop() : '';
     var parameters = { 
     	id: $('#salesforceid').val(),
     	objectName: $('#objectName').val(),
     	caseid: $('#caseid').val(),
     	contactid: $('#contactid').val(),
     	sourceun: $('#namesource').val(),
     	sourcepw: $('#pwsource').val(),
     	sourcest: $('#stsource').val(),
     	sourcedom: sourcedomain,
     	targetun: $('#nametarget').val(),
     	targetpw: $('#pwtarget').val(),
     	targetst: $('#sttarget').val(),
     	targetdom: targetdomain
     };
       $.get( '/copy',parameters, function(data) {
       	console.log(data);
       	var errormsg = '';
       	var successmsg = '';
       	if(data.indexOf('INVALID_LOGIN') > -1 && data.indexOf('SalesforceInput'))
       		errormsg = 'Login Failed to Source Org';
       	else if(data.indexOf('INVALID_LOGIN') > -1 && data.indexOf('SalesforceOutput'))
       		errormsg = 'Login Failed to Target Org';
       	else if(data.indexOf('context.InsertedHAId:') > -1) {
       		successmsg = 'Holistic Application Inserted Successfully.';
       		var substrval = data.split('context.InsertedHAId:').pop();
       		console.log(substrval);
       		var InsertedHAId = substrval.substr(0, substrval.indexOf('>>>>'));
       		console.log('InsertedHAId'+ InsertedHAId);
       		if(InsertedHAId != null && InsertedHAId != undefined) {
       			successmsg += ' Id => ' + InsertedHAId;
       		}
       		
       	}
       	if(errormsg != '') {
       		$('#error').text(errormsg);
       	} else if(successmsg != '') {
       		$('#success').text(successmsg);
       	} else {
       		$('#error').text('Unexpected Error Occurred. Please contact System Administrator.');
       	}
       	$('#myButton').prop('disabled', false);
     	$("#loader").hide();
     });
   }
   catch(err) {
   	console.log('err>>'+err.message);
   	$('#error').text('Unexpected Error Occurred. Please contact System Administrator.');
   	$('#myButton').prop('disabled', false);
    $("#loader").hide();
   }
 });

 $('#salesforceid').on('keyup', function(e){
     var sid = $('#salesforceid').val();
     if(sid.length != 18) {
     	$('#errorId').show();
     } else if(sid.length == 18 || sid.length == 0) {
     	$('#errorId').hide();
     }
 });

 $('#caseid').on('keyup', function(e){
     var sid = $('#caseid').val();
     if(sid.length != 18) {
     	$('#errorId').show();
     } else if(sid.length == 18 || sid.length == 0) {
     	$('#errorId').hide();
     }
 });

 $('#contactid').on('keyup', function(e){
     var sid = $('#contactid').val();
     if(sid.length != 18) {
     	$('#errorId').show();
     } else if(sid.length == 18 || sid.length == 0) {
     	$('#errorId').hide();
     }
 });
});
