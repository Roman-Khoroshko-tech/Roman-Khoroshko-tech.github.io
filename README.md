# Roman Khoroshko Engineering Tools

Персональний каталог інженерних вебзастосунків. HTML5, CSS3, JavaScript ES modules; без runtime-залежностей, бази даних та авторизації.

Адреса після успішного розгортання: https://roman-khoroshko-tech.github.io/

## Архітектура

| Репозиторій | Призначення | Адреса Pages |
|---|---|---|
| Roman-Khoroshko-tech.github.io | Головний портал | https://roman-khoroshko-tech.github.io/ |
| [mfc710-rs-monitor-pages-test](https://github.com/Roman-Khoroshko-tech/mfc710-rs-monitor-pages-test) | MFC710 RS Monitor | https://roman-khoroshko-tech.github.io/mfc710-rs-monitor-pages-test/ |
| [MFC710-PLC-editor](https://github.com/Roman-Khoroshko-tech/MFC710-PLC-editor) | MFC710 PLC Studio – графічний редактор вбудованого ПЛК | https://roman-khoroshko-tech.github.io/MFC710-PLC-editor/ |
| [MFC2000-HMI-Graphs-Viewer](https://github.com/Roman-Khoroshko-tech/MFC2000-HMI-Graphs-Viewer) | MFC2000 HMI Graphs Viewer – перегляд CSV-архівів HMI та побудова графіків частоти, струмів, напруг і температур | https://roman-khoroshko-tech.github.io/MFC2000-HMI-Graphs-Viewer/ |

Кожен застосунок публікується з власного репозиторію. Портал бере адреси запуску, статуси та версії з `tools.json`.

## Файли

- index.html – сторінка порталу.
- assets/styles.css – адаптивні стилі й теми; theme.js – ранній вибір теми.
- assets/catalog.js – перевірка конфігурації й фільтрація; app.js – DOM та завантаження.
- tools.json – єдине джерело каталогу.
- scripts/ – локальний HTTP-сервер і формування дозволеного набору публічних файлів.
- tests/ – перевірка каталогу, пошуку та небезпечних адрес.
- .github/workflows/pages.yml – CI та публікація тільки після успішної перевірки.
- AGENTS.md – правила Codex; docs/MAINTENANCE.md – додавання, оновлення, відкат.

## Локальний запуск

Потрібен Node.js 22 або новіший; рекомендовано 24. npm install не потрібен.

```sh
npm test
npm run build
npm start
```

Відкрий http://127.0.0.1:7311/. Через file:// модулі й fetch JSON можуть блокуватися браузером, тому використовуй HTTP-сервер. Сервер прив’язано лише до 127.0.0.1.

## Публікація

1. Створи public репозиторій Roman-Khoroshko-tech.github.io у власному обліковому записі.
2. Завантаж файли цього проєкту в корінь main, включно з .github/workflows/pages.yml.
3. Settings → Pages → Source → GitHub Actions.
4. Actions → Validate and deploy Pages: дочекайся успішного check і deploy. За потреби запусти workflow вручну.
5. Перевір головну адресу, завантаження tools.json, пошук, тему та мобільний екран. Не вважай успішне завантаження коду підтвердженням доступності сайту.

Для подальшої роботи з уже опублікованим репозиторієм склонуй його в нову папку, щоб отримати повну історію GitHub:

```sh
git clone https://github.com/Roman-Khoroshko-tech/Roman-Khoroshko-tech.github.io.git
cd Roman-Khoroshko-tech.github.io
npm test
npm start
```

Після змін використовуй git add, git commit і git push. Для критичних змін – окрема гілка та PR. Локальна підготовча копія з цього сеансу має окрему початкову історію; для наступних Git-оновлень використовуй свіжий clone, а не force push. Репозиторій редактора клонується аналогічно за його власною адресою.

## Дані та безпека

Портал не містить форм завантаження файлів або передачі робочих даних. localStorage використовується лише для теми. Немає аналітики, шрифтів або скриптів із CDN. GitHub як хост отримує звичайні HTTP-запити; портал не є offline-first застосунком. Поведінку кожного інструмента перевіряй окремо. Конфіденційні файли не додавай ні до коду, ні до історії Git.

Продукційний артефакт _site містить тільки index.html, tools.json, .nojekyll та assets. Тести, документація і службові скрипти не потрапляють у Pages, але залишаються публічними у Git-репозиторії.

Ліцензію на повторне використання коду окремо не надано.
