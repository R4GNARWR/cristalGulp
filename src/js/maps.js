function initMaps()
{
    ymaps.ready(() => {
        const maps = document.querySelectorAll('.map')
        if(maps.length > 0)
        {
            maps.forEach(map => {
                const data = map.dataset;
                map.innerHTML = '<div id="ymap_ctrl_display" style="display: none; width: 100%; height: 100%; position: absolute; background-color: rgba(0, 0, 0, 0.5); z-index: 100; pointer-events: none;"><div style="position: relative; top: 50%; left: 0; right: 0; color: white; text-align: center; font-size: 1.8em; pointer-events: none;">Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl.</div></div>';
                let mapVar = new ymaps.Map(map , {
                    center: [data.lat, data.lng],
                    zoom: data.zoom,
                    controls: []
                });
                
                if(data.dots)
                {
                    const dotsArray = JSON.parse(data.dots)
                    dotsArray.forEach(dot => {
                        dotPlacemark = new ymaps.Placemark([dot.lat, dot.lng], {}, {
                            iconLayout: 'default#image',
                            iconImageHref: dot.image || '',
                            iconImageSize: [30, 42],
                            iconImageOffset: [-5, -38]
                        });
                        
                        mapVar.geoObjects.add(dotPlacemark)
                    });
                    
                    
                }
                mapVar.behaviors.disable('scrollZoom');
                
                if(window.innerWidth > 768)
                {
                    var ctrlKey = false;
                    var ctrlMessageVisible = false;
                    var timer;
                    
                    // Отслеживаем скролл мыши на карте, чтобы показывать уведомление
                    mapVar.events.add(['wheel', 'mousedown'], function(e) {
                        if (e.get('type') == 'wheel') {
                            if (!ctrlKey) { // Ctrl не нажат, показываем уведомление
                                $('#ymap_ctrl_display').fadeIn(300);
                                ctrlMessageVisible = true;
                                clearTimeout(timer); // Очищаем таймер, чтобы продолжать показывать уведомление
                                timer = setTimeout(function() {
                                    $('#ymap_ctrl_display').fadeOut(300);
                                    ctrlMessageVisible = false;
                                }, 1500);
                            }
                            else { // Ctrl нажат, скрываем сообщение
                                $('#ymap_ctrl_display').fadeOut(100);
                            }
                        }
                        if (e.get('type') == 'mousedown' && ctrlMessageVisible) { // Скрываем уведомление при клике на карте
                            $('#ymap_ctrl_display').fadeOut(100);
                        }
                    });
                    
                    // Обрабатываем нажатие на Ctrl
                    $(document).keydown(function(e) {
                        if (e.which === 17 && !ctrlKey) { // Ctrl нажат: включаем масштабирование мышью
                            ctrlKey = true;
                            mapVar.behaviors.enable('scrollZoom');
                        }
                    });
                    $(document).keyup(function(e) { // Ctrl не нажат: выключаем масштабирование мышью
                        if (e.which === 17) {
                            ctrlKey = false;
                            mapVar.behaviors.disable('scrollZoom');
                        }
                    });
                }
            });
        }
    })
    
}
