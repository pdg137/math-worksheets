function random(i) { return Math.floor(Math.random()*i) }

function monomial(variable, c) {
  if(c == 0) { return 0 }
  if(c == 1) { return variable }
  if(c == -1) { return '-'+variable }
  return c + variable
}

function polynomial(variable, coefficients) {
  if(coefficients[0] == 0) {
    return monomial(variable, coefficients[1])
  }

  if(coefficients[1] == 0) {
    return coefficients[0]
  }

  var sum = monomial(variable, coefficients[1]) +
    '+' +
    coefficients[0]
  return sum.replace('+-','-')
}

function problem_linear(variable) {
  var answer = random(15) - 5
  var multiply_by = random(10)+1
  var add_x = random(6) - 3
  var add_constant;

  if(random(2) == 0) {
    add_constant = random(10) - 5
  }
  else {
    add_constant = 0
  }

  var left_p = [
    add_constant,
    multiply_by + add_x
  ]
  var right_p = [
    answer*multiply_by + add_constant,
    add_x
  ]

  if(random(2) == 0) {
    var tmp = left_p;
    left_p = right_p;
    right_p = tmp;
  }

  return polynomial(variable,left_p) +
    ' = '+
    polynomial(variable,right_p)
}

function generate() {
  $('#problems').html('')
  // new Date().toISOString().split('T')[0]

  var variables = ['a','b','c','x','y','z']
  var variable = variables[random(variables.length)]
  $('h1').html('Solve for ``'+variable+'``.')
  for(var i=0;i<6;i++) {
    $('#problems').append('<li>``'+problem_linear(variable)+'``')
  }
}

$(generate)
