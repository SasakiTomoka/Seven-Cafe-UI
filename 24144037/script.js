document.addEventListener('DOMContentLoaded', function() {
  // 各ボタンを取得
  // この部分は現在のUI構造では使用されていないため、コメントアウトまたは削除を検討できます。
  /*
  document.querySelectorAll('.coffee-section').forEach(section => {
    const header = section.querySelector('h2');
    section.querySelectorAll('button.icon').forEach(btn => {
      btn.addEventListener('click', function() {
        header.classList.add('glow');
        setTimeout(() => {
          header.classList.remove('glow');
        }, 1200);
      });
    });
  });
  */
  
  const steps = [
    {
        content: `<h2>カップをセットして<br>スタートボタンを押してください</h2><div class='big-circle-btn' onclick='nextStep(event)'>スタート</div>`,
        progressBar: 1
    },
    {
        content: `<h2>どちらを購入されましたか</h2><div class='dashed-box'><div class='card-row'><div class='card' onclick='nextStep(event)'>コーヒー</div><div class='card' onclick='nextStep(event)'>カフェラテ</div></div></div>`,
        progressBar: 2
    },
    {
        content: `<h2>どちらかお選びください</h2><div class='dashed-box'><div class='card-row'><div class='card' onclick='nextStep(event)'>ホット</div><div class='card' onclick='nextStep(event)'>アイス</div></div></div>`,
        progressBar: 3
    },
    {
        content: `<h2>濃さをお選びください</h2><div class='circle-row'><div><div class='circle-label'>薄め</div><div class='circle light' onclick='nextStep(event)'></div></div><div><div class='circle-label'>普通</div><div class='circle normal' onclick='nextStep(event)'></div></div><div><div class='circle-label'>濃いめ</div><div class='circle dark' onclick='nextStep(event)'></div></div></div>`,
        progressBar: 4
    },
    {
        content: `<h2>サイズをお選びください</h2><div class='dashed-box'><div class='card-row'><div class='card' onclick='nextStep(event)'>Regular</div><div class='card' onclick='nextStep(event)'>Large</div></div></div>`,
        progressBar: 5
    }
];

let currentStep = 0;

function updateContent() {
    const container = document.getElementById('content-container');
    const progressBars = document.querySelectorAll('.progress-bar');

    container.innerHTML = steps[currentStep].content;

    progressBars.forEach((bar, index) => {
        if (index < steps[currentStep].progressBar) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });

    // Highlight the current progress bar segment
    // Ensure currentStep is within bounds for steps array and progressBar id exists
    if (currentStep < steps.length && steps[currentStep] && steps[currentStep].progressBar) {
        const activeProgressBarId = `progress-bar-${steps[currentStep].progressBar}`;
        const activeProgressBar = document.getElementById(activeProgressBarId);
        if (activeProgressBar && activeProgressBar.classList.contains('active')) {
            activeProgressBar.classList.add('progress-bar-glow');
            setTimeout(() => {
                activeProgressBar.classList.remove('progress-bar-glow');
            }, 700); // Match animation duration
        }
    }
}

window.nextStep = function(event) {

    if (currentStep < steps.length - 1) {
        currentStep++;
        updateContent();
    } else if (currentStep === steps.length - 1 && event) { // Check for event to ensure it's a click on the last step
        // This is the last step, call updateContent to highlight the last progress bar
        // but only if it's triggered by a click (event is not null)
        // We don't want this to run on initial load if the last step is somehow pre-selected.
        updateContent();
    }
}

// Initialize the first step
updateContent();
});
