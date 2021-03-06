var app = angular.module("adminApp")

app.factory("Auth", function ($http, $cookies, $location, $rootScope) {
  return {
    login: function (log_data) {
      let data = JSON.stringify({
        datos: log_data
      })

      return $http.post("http://api-privtv.rhcloud.com/admin/login", data)
      .success(function (data, status, headers, config) {
        if (status == 200) {
          $rootScope.mensaje = ""
          $cookies.put("islogged", "true")
          $cookies.putObject("login", data[0])

          $location.path("/dashboard")
        } else if (status == 204) {
          $rootScope.mensaje = "El email y/o la contraseña es erróneo."
        }

      }).error(function (err, status, headers, config) {
        $rootScope.mensaje = err
      })
    },
    logout: function () {
      $cookies.remove("islogged")
      $cookies.remove("login")

      $location.path("/")
    }
  }
})
