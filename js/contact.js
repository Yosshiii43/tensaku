/*************************************************************************
 * contact.js  –  ver.1.0
 *************************************************************************/

document.addEventListener('DOMContentLoaded', () => {

/* ---------------------------------
/* 画面サイズの変更に応じて、親要素の高さを子要素の下端位置に合わせる
/* --------------------------------- */
  (() => {
  const parent = document.querySelector('.p-contact__inner');
  const child  = document.querySelector('.p-contact__form');

  const ro = new ResizeObserver(() => {
    const parentRect = parent.getBoundingClientRect();
    const childRect  = child.getBoundingClientRect();

    // 親の上端から見た child の「下端」位置
    const bottom = childRect.bottom - parentRect.top;

    parent.style.height = `${bottom + 64}px`;
  });

  ro.observe(child);

  })();

/* ---------------------------------
/* チェックボックスの内最低一つを必須項目にする
/* --------------------------------- */
(() => {
  const form = document.querySelector(".p-contact-form");
  const submitBtn = form.querySelector("#submit");
  const inquiryCheckboxes = form.querySelectorAll('input[name="inquiry"]');
  const errorMessage = "いずれか1つ以上選択してください。";

  const validateInquiry = () => {
    const isChecked = form.querySelector('input[name="inquiry"]:checked');

    inquiryCheckboxes.forEach(cb => {
      if (!isChecked) {
        cb.required = true;
        cb.setCustomValidity(errorMessage);
      } else {
        cb.required = false;
        cb.setCustomValidity("");
      }
    });
  };

  const updateButtonState = () => {
    validateInquiry();
    const isValid = form.checkValidity();
    submitBtn.classList.toggle("is-disabled", !isValid);
  };

  form.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", updateButtonState);
    input.addEventListener("change", updateButtonState);
  });

  updateButtonState();
})();

});
