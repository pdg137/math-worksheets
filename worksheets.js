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
  var add_constant_0 = 0;
  if(random(4) == 0)
  {
    add_constant_0 = random(10)-5
  }
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
    (answer+add_constant_0)*multiply_by + add_constant + add_x*add_constant_0,
    add_x
  ]

  var left_variable = variable;
  if(add_constant_0 != 0)
  {
    left_variable = '('+polynomial(variable,[add_constant_0,1])+')'
  }

  left_s = polynomial(left_variable,left_p)
  right_s = polynomial(variable,right_p)

  if(random(2) == 0) {
    var tmp = left_s;
    left_s = right_s;
    right_s = tmp;
  }

  return left_s + ' = ' + right_s
}

function generate() {
  $('#problems').html('')
  // new Date().toISOString().split('T')[0]

  var variables = ['a','b','c','x','y','z']
  var variable = variables[random(variables.length)]
  $('h1').html('Solve for ``'+variable+'`` and check.')
  for(var i=0;i<6;i++) {
    $('#problems').append('<li>``'+problem_linear(variable)+'``')
  }
}

$(generate)
