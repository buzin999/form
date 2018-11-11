$(document).ready(function () {
  /* Кнопка добавить изображение */
  $(".file-upload input[type=file]").change(function () {
    var filename = $(this).val().replace(/.*\\/, "");
    $("#filename").val(filename);
  });
  
  /* Получить элементы, к которым необходимо добавить маски */
  $(function () {
    $(".mask").mask("9?99");
  });

  /* Проверка полей формы на заполненность */
  $('.rf').each(function () {
    // Объявляем переменные (форма и кнопка отправки)
    var form = $(this),
      btn = form.find('.btn_submit');

    // Добавляем каждому проверяемому полю, указание что поле пустое
    form.find('.rfield').addClass('empty_field');

    // Функция проверки полей формы
    function checkInput() {
      form.find('.rfield').each(function () {
        if ($(this).val() != '') {
          // Если поле не пустое удаляем класс-указание
          $(this).removeClass('empty_field');
          $(this).addClass('fill_field');
        } else {
          // Если поле пустое добавляем класс-указание
          $(this).addClass('empty_field');
          $(this).removeClass('fill_field');
        }
      });
    }

    // Функция подсветки незаполненных полей
    function lightEmpty() {
      form.find('.empty_field').css({ 'border-color': '#d8512d' });
      form.find('.fill_field').css({ 'border-color': '#0b5e8f' });
    }

    // Проверка в режиме реального времени
    setInterval(function () {
      // Запускаем функцию проверки полей на заполненность
      checkInput();
      // Считаем к-во незаполненных полей
      var sizeEmpty = form.find('.empty_field').size();
      // Вешаем условие-тригер на кнопку отправки формы
      if (sizeEmpty > 0) {
        if (btn.hasClass('disabled')) {
          return false
        } else {
          btn.addClass('disabled')
        }
      } else {
        btn.removeClass('disabled')
      }
    }, 500);

    // Событие клика по кнопке отправить
    btn.click(function () {
      if ($(this).hasClass('disabled')) {
        // подсвечиваем незаполненные поля и форму не отправляем, если есть незаполненные поля
        lightEmpty();
        return false
      } else {
        // Все хорошо, все заполнено, отправляем форму
        form.submit();
      }
    });
  });

  /* Выбор в списке «Выберите вид спорта» */
  $('.form-block-1').show();
  $('.form-block-2').hide();
  $('.form-block-3').hide();

  $(".sport").change(function () {
    if ($(this).val() == '1') {
      $('.form-block-1').show();
      $('.form-block-2').hide();
      $('.form-block-3').hide();
    } else if ($(this).val() == '2') {
      $('.form-block-2').show();
      $('.form-block-1').hide();
      $('.form-block-3').hide();
    } else {
      $('.form-block-3').show();
      $('.form-block-1').hide();
      $('.form-block-2').hide();
    }
  });

  /* Выбор в поле «Вид заказа» */
  $("input[name='kind-order']").change(function () {
    if ($(this).val() == 'individ') {
      $('.form-block_number').hide();
      $('.button-add').hide();
    } else {
      $('.form-block_number').show();
      $('.button-add').show();
    }
  });
});