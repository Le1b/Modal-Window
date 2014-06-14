(function() {
    app = {
        // Точка входу програми
        initialize: function() {
            this.setupListeners();
        },

        // Відслідковування подій елементів 
        setupListeners: function () {
            $('.openModalBtn').on('click', $.proxy(this.modalWindow, this));
            $('.modalCloseBtn').on('click', $.proxy(this.closeModalWindow, this));
            $('.signMeUp').on('click', $.proxy(this.signMeUp, this));
            $('.required').on('change keyup', $.proxy(this.changeInputFields, this));
        },

        // Перевірка на "валідність" обов'язкових полів
        changeInputFields: function () {
            var valid;

            // Для всіх обов'язкових полів перевіряється довжина поля
            // валідація для простого прикладу
            $('.required').each(function(index, el) {

                // Якщо значення елемента відсутнє, то додаємо клас помилки
                // та видаляємо клас успіху. Якщо ж елемент не пустий,
                // значить він валідний.
                if( $(el).val().length === 0 ) {
                    $(this).addClass('error').removeClass('success');
                    valid = false;
                } else {
                    $(this).addClass('success').removeClass('error');
                    valid = true;
                }

                // Якщо значення полів для вводу не однакові, то форма
                // не форма не валідна.
                if( $('#password').val() !== $('#retype').val() ) {
                    valid = false;
                    $('#password').add($('#retype')).addClass('error').removeClass('success');
                }

            });

            // Повертаємо значення валідності форми.
            return valid;
        },

        // Встановлюємо слухачів подій, приховуємо кнопку та показуємо форму.
        modalWindow: function () {
            this.setupListeners();
            this.displayNone('.openModalBtn');
            this.displayBlock('.modalWindow');
        },

        // Приховуємо вікно та прелоадер, показуємо кнопку та
        // текст кнопку у модальному вікні.
        closeModalWindow: function () {
            this.displayBlock('.openModalBtn');
            this.displayNone('.modalWindow');
            this.displayNone('#fadingBarsG');
            this.displayBlock('.signMeUp span');
        },

        // Перевірка форми на валідність та показ статусу відправки.
        signMeUp: function () {
            if( this.changeInputFields() ) {
                this.displayNone('.signMeUp span');
                this.displayBlock('#fadingBarsG');
                // Видаляємо слухача подій для кнопки відправки,
                // для того щоб не натискали багато разів.
                $('.signMeUp').off('click');
            }
        },

        // Встановлення видимості елемента.
        displayBlock: function (selector) {
            $(selector).slideDown('slow');
        },

        // Приховування елемента.
        displayNone: function (selector) {
            $(selector).slideUp('slow');
        }
    };

    app.initialize();
})();