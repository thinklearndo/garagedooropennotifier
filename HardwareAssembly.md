# Hardware Assembly

## Additional items needed.

Soldering iron

Solder

Nipper or wire cutter to remove excess from pins after soldering items

Mounting tape (I used Scotch 1 in. x 1.60 yds. Permanent Double Sided Clear Mounting Tape, but any kind of permanent mounting tape should work)

Needlenose pliers

Phillips screw driver

3x AA batteries

## Soldering on the voltage regulators
There are two voltage regulators. One provides 3.3v to the Holtek HT68F001 microcontroller, (U2), and the other provides 3.3v to the NodeMCU, with an enable switch (U1).

![Circuit Board and voltage regulators](images/voltage_regulators.jpg)

Solder the MCP1825 voltage regulator into the U1 spot.

![U1 Orientation](images/U1_orientation.jpg)

Solder the MCP1700 voltage regulator into the U2 spot. The solder mask matches the orientation for the part.

![U2 Orientation](images/U2_orientation.jpg)

Once those are soldered on, clip off the excess.

## Soldering on the Capacitors

Solder the Capacitors into the C1, C2, C3, C4 and C5 spots. Make sure to orient them correctly. They are polarized and if put in backwards, they will explode.

There is a white line on one side of the capacitor that shows the negative pin. That pin goes into the hole that has the white half of the circle. See the following picture for an example of the capacitor inserted correctly. The arrow shows the white line on the capacitor showing the negative pin.

![capacitor orientation negative](images/capacitor_negative.jpg)

There is also a positive mark on the board next to each capacitor circle. That is where the positive pin should be inserted.

![capacitor orientation positive marking](images/capacitor_positive.jpg)

Clip off the excess.

## Soldering on the Headers for the NodeMCU

Solder the two strips of headers onto the board. Make sure the headers are flush with the board, or else it will be hard to insert the NodeMCU.

![Headers installed](images/headers_installed.jpg)

## Soldering on the Tilt Switch

I forgot to leave the designation for the tilt switch on the pcb. It goes in the spot under the C1 capacitor spot. When soldering this in, don't press the component up against the board. See the following picture for an example and for the tilt switch location.

![Tilt switch orientation and spacing](images/tilt_switch_orientation.jpg)

Then using a pair of needle nose pliers gently bend the legs of the tilt switch so that the body of the tilt switch is approximately rotated 45 deg in relation to the pcb. Don't bend it by grabbing the body of the component or you might break off the tilt switch. See the picture below for an example. This will help prevent false positives when the door shakes ie from the wind.

![Tilt switch rotated](images/tilt_switch_45.jpg)

## Soldering on the battery holder

The newest board has the markings to show the power connection, J2. The positive, red wire from the battery pack goes in the left most hole of j2. It has a plus sign under it. The negative, black wire from the battery pack goes in the right hole of j2. It has a minus sign under it and white square around the hole.

![Battery hook up](images/power_orientation_fixed.jpg)

## Program and insert the NodeMCU

Upload the program for the NodeMCU according to the [software instructions](https://github.com/thinklearndo/garagedooropennotifier/blob/main/SoftwareSetup.md). Then insert it into the headers.

![Nodemcu inserted](images/nodemcu_inserted.jpg)

## Screw the circuit board into the case

I messed up the screw holes on this board, so you'll need to use the washers to keep them from pulling through.

![screw with washer](images/screw_washer.jpg)

## Tape in the battery holder

Using a small piece of mounting tape, stick a piece on the back of the battery holder then stick it into the case.

## Final assembly

![mounted](images/mounted.jpg)

When mounting it to the garage door, make sure the orientation of the box is correct. The top of the tilt switch should be pointed up. Use several pieces of mounting tape on the back of the box and press it firmly to the garage door. Insert AA batteries and screw on the lid.
