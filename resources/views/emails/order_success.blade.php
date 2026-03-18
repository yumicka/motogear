<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <title>Order success</title>
</head>
<body>
    <h2>Paldies par pasūtījumu</h2>

    <p><strong>Pasūtījuma numurs:</strong> {{ $order->number ?? '' }}</p>
    <p><strong>Klients:</strong> {{ $client['full_name'] ?? '' }}</p>
    <p><strong>Email:</strong> {{ $client['email'] ?? '' }}</p>
    <p><strong>Talrunis:</strong> {{ $client['phone'] ?? '' }}</p>
    <p><strong>Piegādes adrese:</strong> {{ $shipping['full_address'] ?? '' }}</p>

    @if(!empty($rows))
        <table border="1" cellpadding="6" cellspacing="0">
            <thead>
                <tr>
                    <th>Nosaukums</th>
                    <th>Daudzums</th>
                    <th>Izmērs</th>
                    <th>Cena</th>
                    <th>Summa</th>
                </tr>
            </thead>
            <tbody>
                @foreach($rows as $row)
                    <tr>
                        <td>{{ $row['title'] ?? '' }}</td>
                        <td>{{ $row['quantity'] ?? 0 }}</td>
                        <td>{{ $row['size'] ?? '' }}</td>
                        <td>{{ number_format($row['price'] ?? 0, 2, '.', '') }}</td>
                        <td>{{ number_format($row['calculated_price'] ?? 0, 2, '.', '') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

    <p><strong>Piegāde:</strong> {{ number_format($totals['shipping'] ?? 0, 2, '.', '') }}</p>
    <p><strong>Kopā:</strong> {{ number_format($totals['total'] ?? 0, 2, '.', '') }}</p>
</body>
</html>