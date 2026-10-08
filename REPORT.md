Мета роботи
Налаштувати робоче середовище для веброзробки, перевірити наявність Node.js і Git, створити початковий React-проєкт за допомогою Vite, навчитися запускати його та зберігати зміни в системі контролю версій Git.
Використані засоби
- Node.js та npm
- Git
- Visual Studio Code
- React
- Vite
- GitHub
Хід роботи
1. Перевірка програмного забезпечення
У командному рядку перевірено версії Node.js, npm і Git за допомогою команд:
node -v
npm -v
git --version
Результати перевірки:
Програма	Версія
Node.js	<img width="520" height="102" alt="image" src="https://github.com/user-attachments/assets/39f5166a-389d-43e0-bce6-3318770195f0" />

npm	<img width="382" height="87" alt="image" src="https://github.com/user-attachments/assets/c688559b-fc2a-4583-8127-87b26562a45d" />

Git	<img width="451" height="92" alt="image" src="https://github.com/user-attachments/assets/e7615446-55ff-42e4-85cf-38e78e9e8b66" />

2. Робота з репозиторієм
Для лабораторної використано GitHub-репозиторій:
https://github.com/skrypaalina/frontend-labs
Робота розміщена у гілці laba1. Папка React-проєкту міститься за шляхом laba1/laba1 від кореня репозиторію.
3. Створення та запуск React-проєкту
За допомогою Vite створено React-проєкт із назвою laba1. Структура проєкту містить файли конфігурації Vite, package.json, HTML-сторінку та каталог src із файлами застосунку.
Щоб перейти до папки проєкту у Windows Command Prompt, встановити залежності та запустити його, потрібно виконати:
cd /d "шлях-до-репозиторію\laba1"
npm install
npm run dev
Після запуску Vite виводить адресу локального сервера, зазвичай:
http://localhost:5173/
Цю адресу потрібно відкрити у браузері. Щоб зупинити сервер, слід натиснути Ctrl+C у вікні термінала.
4. Збереження змін у Git
Зміни проєкту та звіту зберігаються у Git і відправляються до віддаленого репозиторію на GitHub. Переглянути історію комітів можна командою:
git log --oneline
Після редагування цього звіту його можна зберегти й відправити на GitHub командами:
git add REPORT.md
git commit -m "docs: оформлено звіт до лабораторної 1"
git push
Посилання на гілку з роботою:
https://github.com/skrypaalina/frontend-labs/tree/laba1
Результат роботи
У репозиторії підготовлено React-проєкт на Vite у папці laba1/laba1. Проєкт можна запустити локально за допомогою команд npm install і npm run dev. Файли проєкту та звіт доступні в GitHub-репозиторії.
Висновок
Під час лабораторної роботи перевірено інструменти Node.js і Git, підготовлено робоче середовище у Visual Studio Code та створено початковий React-проєкт за допомогою Vite. Отримано навички запуску проєкту, роботи з Git і збереження результатів у GitHub.
<img width="1917" height="977" alt="image" src="https://github.com/user-attachments/assets/22fe0ec3-f511-4ab9-b24e-5c3a7cd31774" />
