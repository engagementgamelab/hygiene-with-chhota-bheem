﻿using System;
using System.Collections;
using System.Collections.Generic;
using DefaultNamespace;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;
using UnityEngine.Events;

public class VillagerObject : ArchetypeMove
{

	public ParticleSystem Particles;
	public RawImage healthFill;

	public int placeholderIndex = 0;
	public float health = 2;

	private Vector3[] movements = new Vector3[4];

	private IEnumerator RemoveVillager()
	{
		yield return new WaitForSeconds(1);
    Destroy(gameObject);
  }

	// Use this for initialization
	private void Awake () {
		
		base.Awake();

	}
	
	// Update is called once per frame
	private void Update () {
		
		base.Update();

	}

	private void OnTriggerEnter(Collider collider) {
		
		if(collider.gameObject.tag != "Bubble") return;

		placeholderIndex++;

		Events.instance.Raise (new HitEvent(HitEvent.Type.Spawn, collider, collider.gameObject));

		Vector2 v = healthFill.rectTransform.sizeDelta;
		v.x += .5f;
		healthFill.rectTransform.sizeDelta = v;

		if(!(Mathf.Abs(v.x - health) <= .1f)) return;
		
		Particles.Play();
		iTween.ScaleTo(gameObject, Vector3.zero, 1.0f);
		Events.instance.Raise (new ScoreEvent(1, ScoreEvent.Type.Good));

		StartCoroutine(RemoveVillager());

		IsDestroyed = true;
		GameConfig.peopleSaved++;

		SpawnSpellComponent();


	}

}