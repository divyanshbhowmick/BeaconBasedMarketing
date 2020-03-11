#!/bin/sh
# ref: http://www.theregister.co.uk/Print/2013/11/29/feature_diy_apple_ibeacons/
set -x
# inquiry local bluetooth device
#hcitool dev
export BLUETOOTH_DEVICE=hci0
#sudo hcitool -i hcix cmd <OGF> <OCF> <No. Significant Data Octets> <iBeacon Prefix> <UUID> <Major> <Minor> <Tx Pow$

#OGF = Operation Group Field = Bluetooth Command Group = 0x08
#OCF = Operation Command Field = HCI_LE_Set_Advertising_Data = 0x0008
#No. Significant Data Octets (Max of 31) = 1E (Decimal 30)
#iBeacon Prefix (Always Fixed) = 02 01 1A 1A FF 4C 00 02 15
#export DATA=echo -n "google" | od -A n -t x1|sed 's/ /\ /g'
export OGF="0x08"
export OCF="0x0008"
export IBEACONPROFIX="0E 02 01 06 03 03 AA FE 06 16 AA FE 10 00"
#export data="00 1E"
#uuidgen  could gerenate uuid
export UUID=echo -n "google" | od -A n -t x1|sed 's/ /\ /g'
#export UUID="B9 40 7F 30 F5 F8 46 6E AF F9 25 55 6B 57 FE 6D"
#export UUID="76 E8 B4 E0 7E B5 11 E4 B4 A9 08 00 20 0C 9A 66"
export MAJOR="00 01"
export MINOR="00 00"
export POWER="C5 00"
url= `cat test.txt`

# initialize device
sudo hciconfig $BLUETOOTH_DEVICE up
# disable advertising
#sudo hciconfig $BLUETOOTH_DEVICE noleadv
# stop the dongle looking for other Bluetooth devices
#sudo hciconfig $BLUETOOTH_DEVICE noscan

#sudo hciconfig $BLUETOOTH_DEVICE pscan


sudo hciconfig $BLUETOOTH_DEVICE leadv 3

# advertise
sudo hcitool -i $BLUETOOTH_DEVICE cmd $url
echo $url
#sudo hcitool -i $BLUETOOTH_DEVICE cmd 0x08 0x0006 A0 00 A0 00 00 00 00 00 00 00 00 00 00 07 00
#sudo hcitool -i $BLUETOOTH_DEVICE cmd 0x08 0x000a 01

echo "complete"
