<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <title>{{ $subject ?? 'Message' }}</title>
</head>
<body>
    <h2>{{ $subject ?? '' }}</h2>
    <div>{!! nl2br(e($_message ?? '')) !!}</div>
</body>
</html>