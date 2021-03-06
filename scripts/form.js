var popsize = document.getElementById('popsize');
popsize.addEventListener("change", changeSimParams());

var recoverytimeinmillis = document.getElementById('recoverytimeinmillis');
recoverytimeinmillis.addEventListener("change", changeSimParams());

var infectionprobability = document.getElementById('infectionprobability');
infectionprobability.addEventListener("change", changeSimParams());

var speedRange = document.getElementById('speed');
speedRange.addEventListener("change", changeSimParams());

var detectionsuccessrate = document.getElementById('detectionsuccessrate');
detectionsuccessrate.addEventListener("change", changeSimParams());

var restartbtn = document.getElementById('restartbtn');
restartbtn.addEventListener("click", changeSimParams());

var resetbtn = document.getElementById('resetbtn');
resetbtn.addEventListener("click", changeSimParams(true));

/** Resets the simulation with new parameters. If arguments
 * are passed it resets to the default simulation values. */
function changeSimParams(resetToDefault) {
  if (resetToDefault) {
    function updateRangeValues() {
      $('#psactval').html(document.getElementById('popsize').value);
      $('#rtactval').html(document.getElementById('recoverytimeinmillis').value);
      $('#ipactval').html(document.getElementById('infectionprobability').value);
      $('#spactval').html(document.getElementById('speed').value);
      $('#dsractval').html(document.getElementById('detectionsuccessrate').value);
    }
    return () => {
      const defaultValues = sirsim.getDefaultValues();
      popsize.value = defaultValues.popsize;
      recoverytimeinmillis.value = defaultValues.recoveryTimeInMillis;
      infectionprobability.value = defaultValues.infectionProbability;
      speedRange.value = defaultValues.speed;
      detectionsuccessrate.value = defaultValues.detectionSuccessRate;
      sirsim.reset();
      updateRangeValues();
    }
  }

  let prev_psize, prev_rectime, prev_iprob, prev_speed, prev_dsucrate;
  return function () {
    if (resetToDefault) {
      sirsim.reset();
    } else {
      let arg = new Object();
      let psize = parseInt(popsize.value);
      let rectime = parseInt(recoverytimeinmillis.value);
      let iprob = parseFloat(infectionprobability.value);
      let speed = parseFloat(speedRange.value);
      let dsucrate = parseFloat(detectionsuccessrate.value);
      if (psize >= 10 && psize <= 500) {
        arg.popsize = psize;
      }
      if (rectime) {
        arg.recoveryTimeInMillis = rectime;
      }
      if (iprob) {
        arg.infectionProbability = iprob;
      }
      if (speed) {
        arg.speed = speed;
      }
      if(dsucrate) {
        arg.detectionSuccessRate = dsucrate;
      }
      if (prev_psize !== psize || prev_iprob !== iprob ||
        prev_rectime !== rectime || prev_speed !== speed || dsucrate !== dsucrate) {
        sirsim.reset(arg);
      }
    }
  }
}

// configure the form ranges labels
$(function () {
  $("#psmin").html(document.getElementById('popsize').getAttribute('min'));
  $("#psmax").html(document.getElementById('popsize').getAttribute('max'));
  $("#ipmin").html(document.getElementById('infectionprobability').getAttribute('min'));
  $("#ipmax").html(document.getElementById('infectionprobability').getAttribute('max'));
  $("#rtmin").html(document.getElementById('recoverytimeinmillis').getAttribute('min'));
  $("#rtmax").html(document.getElementById('recoverytimeinmillis').getAttribute('max'));
  $("#spmin").html(document.getElementById('speed').getAttribute('min'));
  $("#spmax").html(document.getElementById('speed').getAttribute('max'));
  $("#dsrmin").html(document.getElementById('detectionsuccessrate').getAttribute('min'));
  $("#dsrmax").html(document.getElementById('detectionsuccessrate').getAttribute('max'));

  $('#psactval').html(document.getElementById('popsize').value);
  $('#rtactval').html(document.getElementById('recoverytimeinmillis').value);
  $('#ipactval').html(document.getElementById('infectionprobability').value);
  $('#spactval').html(document.getElementById('speed').value);
  $('#dsractval').html(document.getElementById('detectionsuccessrate').value);

  popsize.addEventListener('change', (() => {
    $('#psactval').html(document.getElementById('popsize').value);
  }));
  recoverytimeinmillis.addEventListener('change', (() => {
    $('#rtactval').html(document.getElementById('recoverytimeinmillis').value);
  }));
  infectionprobability.addEventListener('change', (() => {
    $('#ipactval').html(document.getElementById('infectionprobability').value);
  }));
  speedRange.addEventListener('change', (() => {
    $('#spactval').html(document.getElementById('speed').value);
  }));
  detectionsuccessrate.addEventListener('change', (() => {
    $('#dsractval').html(document.getElementById('detectionsuccessrate').value);
  }));
});

// disables form submission, to prevent unwanted page updates
$('form').submit(false);
