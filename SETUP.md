# Portfolio Site — Инструкция по запуску и деплою

## 1. Персонализация контента

### Замените текст в компонентах:

**`app/components/Header.tsx`** — имя, описание, должность, ссылки, email  
**`app/components/Footer.tsx`** — имя, город, контакты  
**`app/layout.tsx`** — title и description для SEO  

### Добавьте свои медиафайлы:

1. Поместите изображения и видео в папку `public/media/`
2. Откройте `app/data/items.ts`
3. Для каждого элемента укомментируйте/заполните поля:

```typescript
{
  id: 1,
  label: "Название проекта",
  aspectW: 1920,   // ширина медиа в пикселях
  aspectH: 1080,   // высота медиа в пикселях
  imageSrc: "/media/project-1.webp",        // путь к изображению
  // ИЛИ для видео:
  poster: "/media/project-1-poster.webp",   // превью-кадр
  videoSrc: "/media/project-1.mp4",         // путь к видео
}
```

> Рекомендуемый формат: `.webp` для изображений, `.mp4` (H.264) для видео

---

## 2. Локальный запуск

```bash
cd portfolio-site
npm install
npm run dev
```

Откройте: http://localhost:3000

---

## 3. Деплой на Vercel + подключение домена

### Шаг 1 — Загрузите код на GitHub

```bash
cd portfolio-site
git add .
git commit -m "Initial portfolio site"
```

Создайте репозиторий на github.com и запушьте:

```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/portfolio-site.git
git push -u origin main
```

### Шаг 2 — Импорт в Vercel

1. Перейдите на https://vercel.com
2. Войдите через GitHub
3. Нажмите **"Add New... → Project"**
4. Выберите репозиторий `portfolio-site`
5. Настройки оставьте по умолчанию (Next.js определяется автоматически)
6. Нажмите **"Deploy"**

Сайт будет доступен по адресу: `https://portfolio-site-xxx.vercel.app`

### Шаг 3 — Подключение личного домена

1. В дашборде Vercel → ваш проект → вкладка **"Settings" → "Domains"**
2. Введите ваш домен, например: `yourname.com`
3. Нажмите **"Add"**
4. Vercel покажет DNS-записи для настройки

#### Если домен у Cloudflare / Namecheap / GoDaddy:

Добавьте записи в DNS-панели вашего регистратора:

| Тип  | Имя      | Значение                        |
|------|----------|---------------------------------|
| A    | @        | 76.76.21.21                     |
| CNAME| www      | cname.vercel-dns.com            |

> После сохранения DNS может обновляться до 48 часов.  
> Vercel автоматически выдаёт SSL-сертификат (HTTPS).

---

## 4. Обновление сайта после изменений

```bash
git add .
git commit -m "Update content"
git push
```

Vercel автоматически пересоберёт и обновит сайт после каждого пуша в main.

---

## 5. Структура проекта

```
portfolio-site/
├── app/
│   ├── components/
│   │   ├── Header.tsx      ← имя, описание, соцсети
│   │   ├── Archive.tsx     ← сетка с ползунком колонок
│   │   ├── ArchiveItem.tsx ← карточка с анимацией
│   │   ├── Lightbox.tsx    ← полноэкранный просмотр
│   │   └── Footer.tsx      ← подвал
│   ├── data/
│   │   └── items.ts        ← ← ← ВАШИ МЕДИАФАЙЛЫ ЗДЕСЬ
│   ├── globals.css         ← стили, шрифты, переменные
│   ├── layout.tsx          ← SEO: title, description
│   └── page.tsx            ← главная страница
└── public/
    └── media/              ← ← ← ВАШИ ФОТО/ВИДЕО ЗДЕСЬ
```
