<?php
use App\Helpers\Core\FormatHelper;
use Illuminate\Support\Arr;

$pay_until_date = date("Y-m-d H:i:s", strtotime($order->date.' + '.config('configuration.days_for_payment').' days'));
$fields = $order->data['fields'];
$type = $order->type;
?>
<!DOCTYPE html>
<html>
<head>
  <title><?= $order->number ?></title>
  <meta charset="utf-8">
  <style>
    html, body { height: 100%; margin: 0; padding: 0; }
    body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; }
    .container { width: 600px; margin: 5px auto 40px auto; position: relative; }
    .header { padding: 20px 0; background:#fff; text-align: center; }
    .top-line { color: #767586; margin-bottom: 20px; }
    .bill-number { font-weight: bold; margin-bottom: 40px; }
    .top-table-divider { width: 60px; }
    .top-table-line td { border-bottom: 1px solid #000; }
    .products-td-1 { padding: 5px; border: 1px solid #000; border-left: none; }
    .products-td-2 { padding: 5px; border: 1px solid #000; border-right: none; }
    .products-td-3 { padding: 5px; border: 1px solid #000; border-right: none; }
    .products-header td { padding: 5px; }
    .text-align-center { text-align: center; }
    .summary { width: 100%; }
    .summary td { padding: 5px; }
    .summary-top td { border-top: 1px solid #000; }
    .summary-td { border-right:1px solid #000; }
    .summary-bottom td { border-bottom: 1px solid #000; }
    .line { border-top: 1px solid #000; }
  </style>
</head>

<body>
  <div class="header">
    <img class="logo" src="<?= asset('img/logo/skujins_logo.png') ?>"/>
  </div>

  <div class="container">
    <div class="top-line">
      <?= $company_requisites['company_name'] ?>, <?= $company_requisites['physical_address'] ?>
    </div>

    <!-- FIX: td вне таблицы -> div -->
    <div>
      <?= Arr::get($fields[2], 'name') ?> <?= Arr::get($fields[3], 'last_name') ?>
    </div>

    <div><?= Arr::get($order->data['shipping'], 'address') ?></div>

    <div style="height:30px"></div>
    <div class="bill-number">Rēķins Nr. <?= $order->numeration ?></div>

    <table>
      <tr class="top-table-line">
        <td colspan="2"><b>Pakalpojuma sniedzējs</b></td>
        <td><div class="top-table-divider">&nbsp;</div></td>
        <td colspan="2"><b>Maksātājs</b></td>
      </tr>
      <tr>
        <td>Nosaukums</td>
        <td><?= $company_requisites['company_name'] ?></td>
        <td><div class="top-table-divider">&nbsp;</div></td>
        <td style="white-space:nowrap;">Vārds, uzvārds</td>

        <!-- FIX: убрать лишнее ?> -->
        <td><?= Arr::get($fields[2], 'name') ?> <?= Arr::get($fields[3], 'last_name') ?></td>
      </tr>
      <tr>
        <td>Reģ. Nr.</td>
        <td><?= $company_requisites['registration_number'] ?></td>
        <td><div class="top-table-divider">&nbsp;</div></td>
        <td>Klienta ID</td>
        <td><?= $order->id ?></td>
      </tr>
      <tr>
        <td>Adrese</td>
        <td><?= $company_requisites['physical_address'] ?></td>
        <td><div class="top-table-divider">&nbsp;</div></td>
        <td>Adrese</td>
        <td><?= Arr::get($order->data['shipping'], 'address') ?></td>
      </tr>
      <tr>
        <td>Tālrunis</td>
        <td><?= $company_requisites['phone'] ?></td>
        <td><div class="top-table-divider">&nbsp;</div></td>
        <td>Tālrunis</td>
        <td><?= Arr::get($fields[0], 'phone') ?></td>
      </tr>
      <tr>
        <td>E-pasts</td>
        <td><?= $company_requisites['email'] ?></td>
        <td><div class="top-table-divider">&nbsp;</div></td>
        <td>E-pasts</td>
        <td><?= Arr::get($fields[1], 'email') ?></td>
      </tr>
    </table>

    <div style="height:30px"></div>

    <table>
        <tr class="products-header">
          <td>Nosaukums</td>
          <td class="text-align-center">Cena</td>
          <td class="text-align-center">Daudzums</td>
          <td class="text-align-center">Kopā</td>
        </tr>

        <?php foreach ($rows as $row): ?>
          <tr>
            <td class="products-td-1"><?= $row['title'] ?></td>

            <td class="products-td-2 text-align-center">
              <?= FormatHelper::money($row['price']) ?>
            </td>

            <td class="products-td-2 text-align-center">
              <?= $row['quantity'] ?> gab
            </td>

            <td class="products-td-3 text-align-center">
              <?= FormatHelper::money($row['calculated_price']) ?>
            </td>
          </tr>
        <?php endforeach; ?>
      </table>

    <div style="height:30px"></div>

    <table>
      <tr>
        <td style="width:50%"></td>
        <td style="width:50%">
          <table class="summary">
            <tr class="summary-top">
              <td class="summary-td"></td>
              <td></td>
            </tr>
            <tr>
              <td class="summary-td">Piegāde</td>
              <td class="text-align-center"><?= FormatHelper::money($order->shipping) ?></td>
            </tr>
            <tr>
              <td class="summary-td">Kopsumma</td>
              <td class="text-align-center"><?= FormatHelper::money($order->total) ?></td>
            </tr>
            <tr class="summary-bottom">
              <td class="summary-td"></td>
              <td></td>
            </tr>
            <tr>
              <td style="text-align:right;"><b>Summa apmaksāta</b></td>
              <td class="text-align-center"><b><?= FormatHelper::money($order->total) ?></b></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="height:40px"></div>

    <div>Summa apmaksāta vārdiem: <?= FormatHelper::moneyToWords($order->total) ?></div>

    <div style="height:10px"></div>
    <div class="line"></div>
    <div style="height:10px"></div>

    <div><?= $company_requisites['bank'] ?>: <?= $company_requisites['bank_account'] ?></div>

    <div style="height:10px"></div>
    <div class="line"></div>
    <div style="height:10px"></div>

    <div><b>Paldies par veikto pirkumu!</b></div>
    <div style="height:20px"></div>
    <div>Paldies, Jūsu pasūtijums ir saņemts, šobrīd notiek pasūtijuma sagatavošana, Pasūtijums tiks izsūtīts pēc maksājuma saņemšanas.</div>
    <div style="height:20px"></div>
    <div>Ar cieņu,</div>
    <div><?= $company_requisites['company_name'] ?></div>
  </div>
</body>
</html>