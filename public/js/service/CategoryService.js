app.factory('CategoryService', function ($http) {
    return {
        create: function (category) {
            if (!category.title) {
                return false;
            }
            $http.post('/api/categories', category);
        },
        getCategories: function () {
            return $http.get('/api/categories');
        },
        getCategory: function (id) {
            return $http.get('/api/categories/' + id);
        },
        save: function (category) {
            if (!category.title) {
                return false;
            }
            return $http.post('/api/categories/' + category._id + '/update', category);
        },
        delete: function (id) {
            return $http.delete('/api/categories/' + id);
        },
        getIcons: function () {
            return [
                {src: 'person', name: 'Person'},
                {src: 'shopping_basket', name: 'Warenkorb'},
                {src: 'alarm', name: 'Alarm'},
                {src: 'favorite', name: 'Herz'},
                {src: 'event', name: 'Event'},
                {src: 'grade', name: 'Stern'},
                {src: 'local_dining', name: 'Essen'}
            ];
        }
    }
});