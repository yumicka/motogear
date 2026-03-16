<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <title>Jauns pasūtījums</title>
</head>
<body style="font-family: Arial, sans-serif; color: #222;">
    <h2>Jauns pasūtījums</h2>

    @if(!empty($introLines))
        @foreach($introLines as $line)
            <p>{{ $line }}</p>
        @endforeach
    @endif


    @if(!empty($outroLines))
        @foreach($outroLines as $line)
            <p>{{ $line }}</p>
        @endforeach
    @endif
</body>
</html>