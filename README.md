# EVE Online IndusTree
Tool for finding materials for materials for materials... for manufacturing an arbitrary item in [EVE Online](https://www.eveonline.com).

## Prerequisites
You need to have Node.js(R) installed on your system. Get it from [nodejs.org](https://nodejs.org/en/download) if you haven't yet.

## Install
- Clone this repo wherever you like.
- `cd` to that directory.
- Download and unzip EVE Online static data files (SDE) from [developers.eveonline.com](https://developers.eveonline.com/static-data/eve-online-static-data-latest-jsonl.zip) to `eve-online-static-data` directory.

```shell
wget https://developers.eveonline.com/static-data/eve-online-static-data-latest-jsonl.zip
unzip -d eve-online-static-data eve-online-static-data-latest-jsonl.zip
```

## Run
### Usage
```shell
node eve-industree.js <item> [<quantity>]
```
where:
    `item` is the item name as it is in the game, should be enclosed with quotes if contains spaces;
    `quantity`is the number of items to build.

### Examples
Getting materials for building 1x Astero frigate
```shell
node eve-industree.js Astero
```
Getting materials for building 1000x Scourge Heavy Assault Missile
```shell
node eve-industree.js "Scourge Heavy Assault Missile" 1000
```

## To Do
- Correct object filtering so *Avatar* matches the Titan-class ship rather than a player's avatar. (*Sigh... EVE is such an EVE*)
- Optionally flatten the material list so you don't have to sum up all the Tritanium manually.
- Add some kind of graphical representation of the output.

## [License](LICENSE)
For the moment it's [WTFPL](https://www.wtfpl.net/) but it's subject to change in the future. Because current license permits it and because I can. :-b

## LIMITATION OF LIABILITY & DISCLAIMER
THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. IN NO EVENT SHALL THE DEVELOPER BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, INCLUDING BUT NOT LIMITED TO GENERAL, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INJURIES, DEATHS, POLITICAL OR FINANCIAL UPHEAVALS, CATASTROPHES, BROKEN HEARTS, OR ALCOHOLISM ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. USE AT YOUR OWN RISK.

Fly safe! o7
