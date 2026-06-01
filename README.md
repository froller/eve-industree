# EVE Online IndusTree
Tool for finding materials for materials for materials... for manufacturing an arbitrary item in EVE Online.

## Prerequisites
You have to have Node.js(R) installed on your system. Get one at [nodejs.org](https://nodejs.org/en/download) if you haven't yet.

## Install
- Clone this repo wherever you like.
- `cd` to that directory.
- Download and unzip EVE Online static data files (SDE) from [developers.eveonline.com](https://developers.eveonline.com/static-data/eve-online-static-data-latest-jsonl.zip) to `eve-online-static-data` directory.

```shell
$ wget https://developers.eveonline.com/static-data/eve-online-static-data-latest-jsonl.zip
$ unzip -d eve-online-static-data eve-online-static-data-latest-jsonl.zip
```

## Run
```shell
$ node eve-industree.js Astero
```

## Yet to do
- Correct object filtering so *Avatar* match Titan-class ship but not player's avatar. (*Sigh... EVE is such an EVE*)
- Optionnaly flatten material list so you don't have to summ up all the Tritanium manually.
- Add some graphical representation of output

## License
For the moment it's [WTFPL](https://www.wtfpl.net/) but it's subject to change in future. Because current lisense permits it and because I can. :-b

## LIMITATION OF LIABILITY & DISCLAIMER
THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. IN NO EVENT SHALL THE DEVELOPER BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, INCLUDING BUT NOT LIMITED TO GENERAL, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INJURIES, DEATHS, POLITICAL OR FINANCIAL UPHEAVALS, CATASTROPHES, BROKEN HEARTS, OR ALCOHOLISM ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. USE AT YOUR OWN RISK.
